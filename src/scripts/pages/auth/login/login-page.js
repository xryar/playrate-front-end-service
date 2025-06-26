import LoginPresenter from "./login-presenter";
import * as ReviewsAPI from "../../../data/api";
import * as AuthModel from "../../../utils/auth";
import {showError, showSuccess, showToast} from "../../../utils/alert";

export default class LoginPage {
  #presenter = null;

  async render() {
    return `
      <section class="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-white to-secondary">
        <article class="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
          <h1 class="text-center text-2xl font-bold text-gray-800 mb-6">Masuk akun</h1>
          
          <form id="login-form" class="space-y-6">
            <div>
              <label for="username-input" class="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input id="username-input" type="text" name="username" placeholder="Masukkan Username Anda"
                class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
            </div>
            
            <div>
              <label for="password-input" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input id="password-input" type="password" name="password" placeholder="Masukkan password Anda"
                class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
            </div>
            
            <div id="submit-button-container">
               <button type="submit" 
                  class="w-full bg-primary text-white py-2 px-4 rounded-md font-semibold hover:bg-primary-hover transition">
                  Masuk
               </button>
            </div>
            
            <p class="text-center text-sm text-gray-600">
              Belum punya akun? 
              <a href="#/register" class="text-primary font-medium hover:underline">Daftar</a>
            </p>
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
    showSuccess(message).then(() => {
      showToast("Login Berhasil!");
      location.hash = "/";
    })
  }

  loginFailed(message) {
    showError(message)
  }

  showSubmitLoadingButton() {
    document.getElementById("submit-button-container").innerHTML = `
      <button class="w-full bg-primary text-white py-2 px-4 rounded-md font-semibold flex items-center justify-center gap-2" type="submit" disabled>
        <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
        Masuk
      </button>
    `;
  }

  hideSubmitLoadingButton() {
    document.getElementById("submit-button-container").innerHTML = `
            <button type="submit" 
              class="w-full bg-primary text-white py-2 px-4 rounded-md font-semibold hover:bg-primary-hover transition">
              Masuk
            </button>
        `;
  }
}
