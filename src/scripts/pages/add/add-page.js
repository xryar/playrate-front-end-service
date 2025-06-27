import AddPresenter from "./add-presenter";
import * as ReviewsAPI from "../../data/api";
import { convertBase64ToBlob } from "../../utils";
import Camera from "../../utils/camera";
import {showError, showSuccess} from "../../utils/alert";

export default class AddPage {
  #presenter;
  #form;
  #camera;
  #isCameraOpen = false;
  #takenImage = null;

  async render() {
    return `
       <section class="min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-b from-white to-secondary">
          <div class="w-full max-w-xl md:max-w-2xl bg-white p-6 rounded-lg shadow-md">
            <h1 class="text-2xl font-bold text-gray-800 mb-6 text-center">Buat Review Baru</h1>
    
            <form id="new-form" class="space-y-6">
              <!-- Judul -->
              <div>
                <label for="title-input" class="block text-sm font-medium text-gray-700 mb-1">Judul Review</label>
                <input id="title-input" name="title" type="text" placeholder="Masukkan judul review"
                  class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
    
              <!-- Gambar -->
              <div>
                <p class="text-sm font-medium text-gray-700 mb-1">Foto dokumentasi</p>
                <div class="flex gap-2 flex-wrap">
                  <button id="image-input-button" type="button"
                    class="px-4 py-2 border rounded text-sm hover:bg-gray-50">Ambil Gambar</button>
                  <input id="image-input" name="image" type="file" accept="image/*" class="hidden" />
                  <button id="open-image-camera-button" type="button"
                    class="px-4 py-2 border rounded text-sm hover:bg-gray-50">Buka Kamera</button>
                </div>
                <div id="camera-container" class="hidden mt-4 space-y-2">
                  <video id="camera-video" class="w-full h-auto rounded border"></video>
                  <canvas id="camera-canvas" class="hidden"></canvas>
                  <div class="flex items-center gap-2">
                    <select id="camera-select" class="border rounded px-2 py-1 text-sm"></select>
                    <button id="camera-take-button" type="button"
                      class="bg-primary text-white px-4 py-2 rounded text-sm hover:bg-primary-hover">Ambil Gambar</button>
                  </div>
                </div>
                <ul id="image-taken" class="mt-4 flex flex-wrap gap-2"></ul>
              </div>
    
              <!-- Deskripsi -->
              <div>
                <label for="description-input" class="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                <textarea id="description-input" name="description" placeholder="Masukkan deskripsi"
                  class="w-full min-h-[100px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"></textarea>
              </div>
    
              <!-- Tombol -->
              <div class="space-y-3 pt-4">
                <span id="submit-button-container" class="block">
                  <button type="submit"
                    class="w-full bg-primary text-white py-2 rounded font-semibold hover:bg-primary-hover transition">
                    Buat Review
                  </button>
                </span>
                <a href="#/"
                  class="block w-full text-center text-primary font-medium hover:underline transition text-sm">
                  Batal
                </a>
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

      const title = document.getElementById("title-input").value;
      const description = document.getElementById("description-input").value;

      if (!this.#takenImage || !this.#takenImage.blob) {
        showError("Gambar wajib diunggah!");
        return;
      }
      if (!title.trim()) {
        showError("Judul tidak boleh kosong!");
        return;
      }
      if (!description.trim()) {
        showError("Deskripsi tidak boleh kosong!");
        return;
      }

      await this.#presenter.postNewReview({
        title,
        description,
        cover: this.#takenImage.blob,
      });
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
    document
      .getElementById("open-image-camera-button")
      .addEventListener("click", async (event) => {
        const cameraContainer = document.getElementById("camera-container");

        this.#isCameraOpen = !this.#isCameraOpen;

        if (this.#isCameraOpen) {
          cameraContainer.classList.remove("hidden");
          event.currentTarget.textContent = "Tutup Kamera";
          this.#setupCamera();
          await this.#camera.launch();
        } else {
          cameraContainer.classList.add("hidden");
          event.currentTarget.textContent = "Buka Kamera";
          this.#camera.stop();
        }
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
    if (!this.#takenImage || !this.#takenImage.blob) {
      console.error("Error: Blob tidak tersedia!", this.#takenImage);
      return;
    }

    const imageUrl = URL.createObjectURL(this.#takenImage.blob);
    document.getElementById("image-taken").innerHTML = `
      <li>
         <button type="button" id="delete-picture-button" class="relative-group">
           <img src="${imageUrl}" alt="image" class="w-32 h-32 object-cover rounded border"/>
           <span class="absolute top-1 right-1 bg-white text-red-600 text-xs rounded-full px-2 py-0.5 shadow hidden group-hover:block">X</span>
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
    showSuccess(message).then(() => {
      this.clearForm();
      location.href = "/";
    });
  }

  storeFailed(message) {
    showError(message);
  }

  clearForm() {
    this.#form.reset();
  }

  showSubmitLoadingButton() {
    document.getElementById("submit-button-container").innerHTML = `
      <button type="submit" disabled
        class="bg-primary text-white px-6 py-2 rounded flex items-center justify-center gap-2 w-full">
        <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
        Buat Review
      </button>
    `;
  }

  hideSubmitLoadingButton() {
    document.getElementById("submit-button-container").innerHTML = `
      <button type="submit" class="bg-primary text-white px-6 py-2 rounded hover:bg-primary-hover transition w-full">
         Buat Review
      </button>
    `;
  }
}
