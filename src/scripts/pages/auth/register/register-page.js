export default class RegisterPage {
  #presenter = null;

  async render() {
    return `
            <section class="register-container">
                <div class="register-form-container">
                    <h1 class="register__title">Daftar Akun</h1>
                    
                    <form class="register__form" class="register__form">
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
}
