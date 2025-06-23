import HomePresenter from "./home-presenter";
import * as ReviewsAPI from "../../data/api";
import {
    generateLoaderAbsoluteTemplate, generateReviewItemTemplate,
    generateReviewsListEmptyTemplate,
    generateReviewsListErrorTemplate
} from "../../template";

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

    populateReviewsList(message, listReviews) {
        if (listReviews.left <= 0) {
            this.populateReviewsListEmpty();
            return;
        }

        const html = listReviews.reduce((acc, review) => {
            return acc.concat(
                generateReviewItemTemplate({
                    id: review.id,
                    username: review.username,
                    title: review.title,
                    description: review.description,
                    coverUrl: review.coverUrl,
                    createdAt: review.createdAt,
                })
            );
        }, '');

        document.getElementById("reviews-list").innerHTML = `
            <div class="reviews-list">${html}</div>
        `;
    }

    populateReviewsListEmpty() {
        document.getElementById("reviews-list").innerHTML = generateReviewsListEmptyTemplate();
    }

    populateReviewsListError(message) {
        document.getElementById("reviews-list").innerHTML = generateReviewsListErrorTemplate(message);
    }

    showLoading() {
        document.getElementById("reviews-list-loading-container").innerHTML = generateLoaderAbsoluteTemplate();
    }

    hideLoading() {
        document.getElementById("reviews-list-loading-container").innerHTML = "";
    }
}
