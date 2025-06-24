import DetailPresenter from "./detail-presenter";
import * as ReviewsAPI from "../../data/api";
import { parseActivePathname } from "../../routes/url-parser";
import {
  generateLoaderAbsoluteTemplate,
  generateReviewDetailErrorTemplate,
  generateReviewDetailTemplate,
} from "../../template";

export default class DetailPage {
  #presenter = null;

  async render() {
    return `
            <section>
                <div class="review-detail__container">
                    <div id="review-detail" class="review-detail"></div>
                    <div id="review-detail-loading-container"></div>
                </div>
            </section>
        `;
  }

  async afterRender() {
    this.#presenter = new DetailPresenter(parseActivePathname().id, {
      view: this,
      model: ReviewsAPI,
    });

    await this.#presenter.showReviewDetail();
  }

  async populateReviewDetail(message, review) {
    document.getElementById("review-detail").innerHTML =
      generateReviewDetailTemplate({
        username: review.username,
        description: review.description,
        coverUrl: review.coverUrl,
        createdAt: review.createdAt,
      });
  }

  populateReviewDetailError(message) {
    document.getElementById("review-detail").innerHTML =
      generateReviewDetailErrorTemplate(message);
  }

  showReviewDetailLoading() {
    document.getElementById("review-detail-loading-container").innerHTML =
      generateLoaderAbsoluteTemplate();
  }

  hideReviewDetailLoading() {
    document.getElementById("review-detail-loading-container").innerHTML = "";
  }
}
