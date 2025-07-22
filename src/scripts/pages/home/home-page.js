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
            <h1 class="text-3xl font-bold text-center text-gray-800 mb-6">List Review</h1>
            
            <div class="mb-10 max-w-md mx-auto">
                <input
                type="text"
                id="search-input"
                placeholder="Cari Review berdasarkan judul..."
                class="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary">
            </div>
            
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

    this._initializedSearchInput();
    await this.#presenter.initialReviews();
  }

  _initializedSearchInput() {
    const searchInput = document.getElementById("search-input");
    const handleSearch = this._debounce(async (e) => {
      const query = e.target.value.trim();

      if (query.length > 0) {
        await this.#presenter.search(query);
      } else {
        await this.#presenter.initialReviews();
      }
    }, 300);

    searchInput.addEventListener("input", handleSearch);
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

  _debounce(callback, delay) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => callback.apply(this, args), delay);
    };
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
