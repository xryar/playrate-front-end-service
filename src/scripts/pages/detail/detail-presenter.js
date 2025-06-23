export default class DetailPresenter {
  #reviewId;
  #view;
  #model;

  constructor(reviewId, { view, model }) {
    this.#reviewId = reviewId;
    this.#view = view;
    this.#model = model;
  }

  async showReviewDetail() {
    this.#view.showReviewDetailLoading();
    try {
        const response = await this.#model.getReviewById(this.#reviewId);

        if (!response.ok) {
            console.error("showReviewDetail Error: ", response);
            this.#view.populateReviewDetailError(response.message);
            return;
        }

        await this.#view.populateReviewDetail(response.message, response.data);
    } catch (e) {
        console.error("showReviewDetail Error: ", e);
        this.#view.populateReviewDetailError(e.message);
    } finally {
        this.#view.hideReviewDetailLoading();
    }
  }
}
