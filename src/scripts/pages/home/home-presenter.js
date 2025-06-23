export default class HomePresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async initialReviews() {
    this.#view.showLoading();
    try {
      const response = await this.#model.getAllReviews();

      if (!response.ok) {
        console.error("initialReviews Error: ", response);
        this.#view.populateReviewsListError(response.message);
        return;
      }

      this.#view.populateReviewsList(response.message, response.data.reviews);
    } catch (error) {
      console.error("initialReviews Error: ", error);
    } finally {
      this.#view.hideLoading();
    }
  }
}
