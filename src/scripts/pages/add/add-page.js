import AddPresenter from "./add-presenter";
import * as ReviewsAPI from "../../data/api";
import { convertBase64ToBlob } from "../../utils";
import Camera from "../../utils/camera";

export default class AddPage {
  #presenter;
  #form;
  #camera;
  #isCameraOpen = false;
  #takenImage = null;

  async render() {
    return `
      <section>
          <div class="new-review__header">
              <div class="container">
                  <h1 class="new-review__header__title">Buat Review Baru</h1>
              </div>
          </div>
      </section>
      
      <section class="container">
          <div class="new-form__container">
              <form id="new-form" class="new-form">
                  <div class="form-control">
                    <label for="image-input" class="new-form__image__title"></label>
                    <div id="image-more-info">Anda dapat menyertakan foto sebagai dokumentasi.</div>
      
                    <div class="new-form__image__container">
                      <div class="new-form__image__buttons">
                        <button id="image-input-button" class="btn btn-outline" type="button">Ambil Gambar</button>
                        <input
                          id="image-input"
                          class="new-form__image__input"
                          name="image"
                          type="file"
                          accept="image/*"
                          aria-describedby="image-more-info"
                        >
                        <button id="open-image-camera-button" class="btn btn-outline" type="button">
                          Buka Kamera
                        </button>
                      </div>
                      <div id="camera-container" class="new-form__camera__container">
                        <video id="camera-video" class="new-form__camera__video">
                          video stream not available.
                        </video>
      
                        <canvas id="camera-canvas" class="new-form__camera__canvas"></canvas>
      
                        <div class="new-form__camera__tools">
                          <select id="camera-select"></select>
                          <div class="new-form__camera__tools_buttons">
                            <button id="camera-take-button" class="btn" type="button">
                              Ambil Gambar
                            </button>
                          </div>
                        </div>
                      </div>
                      <ul id="image-taken" class="new-form__image__outputs"></ul>
                    </div>
                  </div>
              
                  <div class="form-control">
                      <label for="description-input" class="new-form__description__title"></label>
                  
                      <div class="new-form__description__container">
                          <textarea
                            id="description-input"
                            name="description"
                            placeholder="Masukkan deskripsi"
                          ></textarea>
                      </div>
                  </div>
                  <div class="form-buttons">
                    <span id="submit-button-container">
                      <button class="btn" type="submit">Buat Review</button>
                    </span>
                    <a class="btn btn-outline" href="#/">Batal</a>
                  </div>
              </form>
          </div>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new AddPresenter({
      view: this,
      model: ReviewsAPI,
    });

    this.#setupForm();
  }

  #setupForm() {
    this.#form = document.getElementById("new-form");
    this.#form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const data = {
        image: this.#takenImage ? this.#takenImage.blob : null,
        description: document.getElementById("description").value,
      };

      await this.#presenter.postNewReview(data);
    });

    document
      .getElementById("image-input")
      .addEventListener("change", async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        await this.#addTakenPicture(file);
        await this.#populateTakenPicture();
      });

    document
      .getElementById("image-input-button")
      .addEventListener("click", () => {
        this.#form.elements.namedItem("image").click();
      });

    // camera
    const cameraContainer = document.getElementById("camera-container");
    document
      .getElementById("open-image-camera-button")
      .addEventListener("click", async (event) => {
        cameraContainer.classList.toggle("open");

        this.#isCameraOpen = cameraContainer.classList.contains("open");
        if (this.#isCameraOpen) {
          event.currentTarget.textContent = "Tutup Camera";
          this.#setupCamera();
          this.#camera.launch();

          return;
        }

        event.currentTarget.textContent = "Buka Kamera";
        this.#camera.stop();
      });
  }

  #setupCamera() {
    if (this.#camera) {
      return;
    }

    this.#camera = new Camera({
      video: document.getElementById("camera-video"),
      cameraSelect: document.getElementById("camera-select"),
      canvas: document.getElementById("camera-canvas"),
    });

    this.#camera.addCheeseButtonListener("#camera-take-button", async () => {
      const image = await this.#camera.takePicture();
      await this.#addTakenPicture(image);
      await this.#populateTakenPicture();
      alert(URL.createObjectURL(image));
    });
  }

  async #addTakenPicture(image) {
    let blob = image;

    if (image instanceof String) {
      blob = await convertBase64ToBlob(image, "image/png");
    }

    this.#takenImage = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      blob: blob,
    };
  }

  async #populateTakenPicture() {
    if (!this.#takenImage || this.#takenImage.blob) {
      console.error("Error: Blob tidak tersedia!", this.#takenImage);
      return;
    }

    const imageUrl = URL.createObjectURL(this.#takenImage.blob);
    document.getElementById("image-taken").innerHTML = `
      <li class="new-form__image__outputs-item">
         <button type="button" id="delete-picture-button" class="new-form__image__outputs-item__delete-btn">
           <img src="${imageUrl}" alt="image">
         </button>
      </li>
    `;

    document
      .getElementById("delete-picture-button")
      .addEventListener("click", () => {
        this.#removePicture();
        this.#populateTakenPicture();
      });
  }

  #removePicture() {
    this.#takenImage = null;
  }

  storeSuccessfully(message) {
    console.log(message);
    this.clearForm();

    location.href = "/";
  }

  storeFailed(message) {
    alert(message);
  }

  clearForm() {
    this.#form.reset();
  }

  showSubmitLoadingButton() {
    document.getElementById("submit-button-container").innerHTML = `
          <button class="btn" type="submit" disabled>
            <i class="fas fa-spinner loader-button"></i> Buat Review
          </button>
        `;
  }

  hideSubmitLoadingButton() {
    document.getElementById("submit-button-container").innerHTML = `
          <button class="btn" type="submit">Buat Review</button>
        `;
  }
}
