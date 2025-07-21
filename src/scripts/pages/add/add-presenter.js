export default class AddPresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async postNewReview({ cover, title, description, rating }) {
    this.#view.showSubmitLoadingButton();
    try {
      const data = {
        cover,
        title,
        description,
        rating,
      };
      const response = await this.#model.addReview(data);

      if (!response.ok) {
        console.error("postNewReview Error: ", response);
        this.#view.storeFailed(response.message);
        return;
      }

      this.#view.storeSuccessfully(response.message, response.data);
    } catch (e) {
      console.error("postNewReview Error: ", e);
      this.#view.storeFailed(e.message);
    } finally {
      this.#view.hideSubmitLoadingButton();
    }
  }
}
