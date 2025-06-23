export default class RegisterPresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async Register({ fullname, username, password }) {
    this.#view.showSubmitLoadingButton();
    try {
        const response = await this.#model.Register({ fullname, username, password });

        if (!response.ok) {
            console.error('Register Error: ', response);
            this.#view.registeredFailed(response.message);
            return;
        }

        this.#view.registeredSuccessfully(response.message, response.data);
    } catch (error) {
        console.error('Register Error: ', error);
        this.#view.registeredFailed(error.message);
    } finally {
        this.#view.hideSubmitLoadingButton();
    }
  }
}
