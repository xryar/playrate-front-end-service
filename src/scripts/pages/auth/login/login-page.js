import LoginPresenter from "./login-presenter";
import * as ReviewsAPI from "../../../data/api";
import * as AuthModel from "../../../utils/auth";

export default class LoginPage {
  #presenter = null;

  async render() {
    return `
            <section class="login-container">
                <article class="login-form-container">
                  <h1 class="login__title">Masuk akun</h1>
        
                  <form id="login-form" class="login-form">
                    <div class="form-control">
                      <label for="username-input" class="login-form__username-title">Username</label>
        
                      <div class="login-form__title-container">
                        <input id="username-input" type="text" name="username" placeholder="Masukkan Username Anda">
                      </div>
                    </div>
                    <div class="form-control">
                      <label for="password-input" class="login-form__password-title">Password</label>
        
                      <div class="login-form__title-container">
                        <input id="password-input" type="password" name="password" placeholder="Masukkan password Anda">
                      </div>
                    </div>
                    <div class="form-buttons login-form__form-buttons">
                      <div id="submit-button-container">
                        <button class="btn" type="submit">Masuk</button>
                      </div>
                      <p class="login-form__do-not-have-account">Belum punya akun? <a href="#/register">Daftar</a></p>
                    </div>
                  </form>
                </article>
            </section>
        `;
  }

  async afterRender() {
    this.#presenter = new LoginPresenter({
      view: this,
      model: ReviewsAPI,
      authModel: AuthModel,
    });

    this.#setupForm();
  }

  #setupForm() {
    document
      .getElementById("login-form")
      .addEventListener("submit", async (event) => {
        event.preventDefault();

        const data = {
          username: document.getElementById("username-input").value,
          password: document.getElementById("password-input").value,
        };

        await this.#presenter.Login(data);
      });
  }

  loginSuccessfully(message) {
    console.log(message);

    location.hash = "/";
  }

  loginFailed(message) {
    alert(message);
  }

  showSubmitLoadingButton() {
    document.getElementById("submit-button-container").innerHTML = `
            <button class="btn" type="submit" disabled>
                <i class="fa fa-spinner loader-button"></i> Masuk
            </button>
        `;
  }

  hideSubmitLoadingButton() {
    document.getElementById("submit-button-container").innerHTML = `
            <button class="btn" type="submit">Masuk</button>
        `;
  }
}
