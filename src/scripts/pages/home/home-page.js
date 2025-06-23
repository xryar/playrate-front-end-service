import HomePresenter from "./home-presenter";
import * as ReviewsAPI from "../../data/api";

export default class HomePage {
    #presenter;

    async render() {
        return `
          <section class="container">
            <h1 class="section-title">List Review</h1>
            
            <div class="reviews-list__container">
                <div id="reviews-list"></div>
                <div id="reviews-list-loading-container"></div>
            </div>
          </section>
        `;
    }

    async afterRender() {
        this.#presenter = new HomePresenter({
            view: this,
            model: ReviewsAPI,
        });

        await this.#presenter.initialReviews();
    }
}
