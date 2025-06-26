import {
    generateLoaderAbsoluteTemplate, generateMyReviewItemTemplate,
    generateReviewsListEmptyTemplate,
    generateReviewsListErrorTemplate
} from "../../template";
import * as ReviewsAPI from "../../data/api";
import MyReviewPresenter from "./my-review-presenter";
import {showConfirm} from "../../utils/alert";

export default  class MyReviewPage {
    #presenter;

    async render() {
        return `
            <section class="px-4 py-10 max-w-7xl mx-auto">
                <h1 class="text-3xl font-bold text-center text-gray-800 mb-10">Review Saya</h1>
                <div class="relative">
                    <div id="my-review-list"></div>
                    <div id="my-review-loading-center" class="absolute inset-0 flex items-center justify-center"></div>
                </div>
            </section>
        `;
    }

    async afterRender() {
        this.#presenter = new MyReviewPresenter({
            view: this,
            model: ReviewsAPI,
        });

        await this.#presenter.loadMyReview();
    }

    populateReviewsList(message, listReviews) {
        if (listReviews.left <= 0) {
            this.populateReviewsListEmpty();
            return;
        }

        const container = document.getElementById("my-review-list");

        const html = listReviews
            .map((review) =>
                generateMyReviewItemTemplate({
                    id: review.id,
                    username: review.username,
                    title: review.title,
                    description: review.description,
                    coverUrl: review.coverUrl,
                    createdAt: review.createdAt,
                })
            )
            .join("");

        container.innerHTML = `
            <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">${html}</div>
        `;

        container.querySelectorAll("[data-delete-id]").forEach((btn) => {
            btn.addEventListener("click", async () => {
                const reviewId = btn.getAttribute("data-delete-id");
                const { isConfirmed } = await showConfirm({
                    title: "Hapus Review?",
                    text: "Aksi ini tidak dapat dibatalkan. Apakah anda yakin ingin menghapus review ini?",
                });

                if (!isConfirmed) return;
                const card = btn.closest("[data-reviewid]");
                card.classList.add("transition-all", "duration-300", "opacity-0", "scale-95");

                await new Promise((resolve) => setTimeout(resolve, 300));
                await this.#presenter.deleteReview(reviewId);
                card.remove();
            })
        })
    }

    populateReviewsListEmpty() {
        document.getElementById("my-review-list").innerHTML =
            generateReviewsListEmptyTemplate();
    }

    populateReviewsListError(message) {
        document.getElementById("my-review-list").innerHTML =
            generateReviewsListErrorTemplate(message);
    }

    showLoading() {
        const loading = document.getElementById("my-review-loading-center");
        loading.classList.remove("hidden");
        loading.innerHTML = generateLoaderAbsoluteTemplate();
    }

    hideLoading() {
        const loading = document.getElementById("my-review-loading-center");
        loading.classList.add("hidden");
    }
}
