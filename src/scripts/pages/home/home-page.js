import HomePresenter from "./home-presenter";
import * as ReviewsAPI from "../../data/api";
import {
  generateLoaderAbsoluteTemplate,
  generateReviewItemTemplate,
  generateReviewsListEmptyTemplate,
  generateReviewsListErrorTemplate,
} from "../../template";

export default class HomePage {
  #presenter;

  async render() {
    return `
          <section class="px-4 py-10 max-w-7xl mx-auto">
            <h1 class="text-3xl font-bold text-center text-gray-800 mb-10">List Review</h1>
            
            <div class="relative">
                <div id="reviews-list"></div>
                <div id="reviews-list-loading-container" class="absolute inset-0 flex items-center justify-center"></div>
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
    if (!listReviews || listReviews.length === 0) {
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
        }),
      );
    }, "");

    document.getElementById("reviews-list").innerHTML = `
            <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">${html}</div>
        `;
  }

  populateReviewsListEmpty() {
    document.getElementById("reviews-list").innerHTML =
      generateReviewsListEmptyTemplate();
  }

  populateReviewsListError(message) {
    document.getElementById("reviews-list").innerHTML =
      generateReviewsListErrorTemplate(message);
  }

  showLoading() {
    const loading = document.getElementById("reviews-list-loading-container");
    loading.classList.remove("hidden");
    loading.innerHTML = generateLoaderAbsoluteTemplate();
  }

  hideLoading() {
    const loading = document.getElementById("reviews-list-loading-container");
    loading.classList.add("hidden");
  }
}
