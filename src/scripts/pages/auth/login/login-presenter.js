export default class LoginPresenter {
  #view;
  #model;
  #authModel;

  constructor({ view, model, authModel }) {
    this.#view = view;
    this.#model = model;
    this.#authModel = authModel;
  }

  async Login({ username, password }) {
    this.#view.showSubmitLoadingButton();
    try {
      const response = await this.#model.Login({ username, password });

      if (!response.ok) {
        console.error("Login Error: ", response);
        this.#view.loginFailed(response.message);
        return;
      }

      this.#authModel.putAccessToken(response.data.accessToken);
      this.#authModel.putRefreshToken(response.data.refreshToken);

      this.#view.loginSuccessfully(response.message, response.data);
    } catch (error) {
      console.error("Login Error", error);
      this.#view.loginFailed(error.message);
    } finally {
      this.#view.hideSubmitLoadingButton();
    }
  }
}
