import * as ReviewsAPI from "../../../data/api";
import RegisterPresenter from "./register-presenter";

export default class RegisterPage {
  #presenter = null;

  async render() {
    return `
        <section class="register-container">
            <div class="register-form-container">
                <h1 class="register__title">Daftar Akun</h1>
                
                <form id="register__form" class="register__form">
                    <div class="form-control">
                        <label for="name-input" class="register-form__name-title">Nama Lengkap</label>
                        
                        <div class="register-form__title-container">
                            <input id="name-input" type="text" name="name" placeholder="Masukkan nama lengkap Anda">
                        </div>
                    </div>
                    <div class="form-control">
                        <label for="username-input" class="register-form__username-title">Username</label>
                        
                        <div class="register-form__title-container">
                            <input id="username-input" type="text" name="username" placeholder="Masukkan Username Anda">
                        </div>
                    </div>
                    <div class="form-control">
                        <label for="name-input" class="register-form__name-title">Nama Lengkap</label>
                        
                        <div class="register-form__title-container">
                            <input id="name-input" type="text" name="name" placeholder="Masukkan nama lengkap Anda">
                        </div>
                    </div>
                </form>
            </div>
        </section>
    `;
  }

  async afterRender() {
    this.#presenter = new RegisterPresenter({
      view: this,
      model: ReviewsAPI,
    });

    this.#setupForm();
  }

  #setupForm() {
    document
      .getElementById("register-form")
      .addEventListener("submit", async (event) => {
        event.preventDefault();

        const data = {
          fullname: document.getElementById("name-input").value,
          username: document.getElementById("username-input").value,
          password: document.getElementById("password-input").value,
        };

        await this.#presenter.Register(data);
      });
  }

  registeredSuccessfully(message) {
    console.log(message);

    location.hash = "/login";
  }

  registeredFailed(message) {
    alert(message);
  }

  showSubmitLoadingButton() {
    document.getElementById("submit-button-container").innerHTML = `
       <button>
         <i class="fa fa-spinner loader-button"></i> Daftar Akun
       </button>
    `;
  }

  hideSubmitLoadingButton() {
    document.getElementById("submit-button-container").innerHTML = `
       <button class="btn" type="submit"> Daftar Akun </button>
    `;
  }
}
