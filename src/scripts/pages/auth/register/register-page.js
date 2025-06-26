import * as ReviewsAPI from "../../../data/api";
import RegisterPresenter from "./register-presenter";
import {showError, showSuccess} from "../../../utils/alert";

export default class RegisterPage {
  #presenter = null;

  async render() {
    return `
        <section class="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-white to-secondary">
            <div class="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <h1 class="text-center text-2xl font-bold text-gray-800 mb-6">Daftar Akun</h1>
                
                <form id="register-form" class="space-y-6">
                    <div>
                        <label for="name-input" class="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                        <input id="name-input" type="text" name="name" placeholder="Masukkan nama lengkap Anda"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                    </div>
                    
                    <div>
                        <label for="username-input" class="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input id="username-input" type="text" name="username" placeholder="Masukkan Username Anda"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                    </div>
                    
                    <div >
                        <label for="password-input" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input id="password-input" type="password" name="password" placeholder="Masukkan Password Anda"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                    </div>
                    
                    <div id="submit-button-container">
                        <button type="submit"
                            class="w-full bg-primary text-white py-2 px-4 rounded-md font-semibold hover:bg-primary-hover transition" >
                            Daftar akun
                        </button>
                    </div>
                    
                    <p class="text-center text-sm text-gray-600">
                        Sudah punya akun? 
                        <a href="#/login" class="text-primary font-medium hover:underline">Masuk</a>
                    </p>
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
    showSuccess(message).then(() => {
      location.hash = "/login";
    })
  }

  registeredFailed(message) {
    showError(message)
  }

  showSubmitLoadingButton() {
    document.getElementById("submit-button-container").innerHTML = `
       <button type="submit" disabled
         class="w-full bg-primary text-white py-2 px-4 rounded-md font-semibold flex items-center justify-center gap-2">
         <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
           <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
           <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
         </svg>
         Daftar Akun
        </button>
    `;
  }

  hideSubmitLoadingButton() {
    document.getElementById("submit-button-container").innerHTML = `
       <button type="submit"
         class="w-full bg-primary text-white py-2 px-4 rounded-md font-semibold hover:bg-primary-hover transition" >
         Daftar akun
       </button>
    `;
  }
}
