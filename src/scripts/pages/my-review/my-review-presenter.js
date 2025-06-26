export default class MyReviewPresenter {
    #view;
    #model;

    constructor({ view, model }) {
        this.#view = view;
        this.#model = model;
    }

    async loadMyReview() {
        this.#view.showLoading();

        try {
            const response = await this.#model.getMyReviews();

            if (!response.ok) {
                console.error("load My Review Error: ", response);
                this.#view.populateReviewsListError(response.message);
                return;
            }

            this.#view.populateReviewsList(response.message, response.data.reviews)
        } catch (error) {
            console.error("load My Review Error: ", error);
            this.#view.populateReviewsListError(error.message);
        } finally {
            this.#view.hideLoading();
        }
    }
}
