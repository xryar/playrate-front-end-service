import { showFormattedDate } from "./utils";

export function generateLoaderTemplate() {
  return `
    <div class="loader"></div>
  `;
}

export function generateLoaderAbsoluteTemplate() {
  return `
        <div class="loader loader-absolute"></div>
    `;
}

export function generateUnauthenticatedNavigationListTemplate() {
  return `
        <li> <a id="login-button" href="#/login">Login</a></li>
        <li> <a id="register-button" href="#/register">Register</a></li>
    `;
}

export function generateAuthenticatedNavigationListTemplate() {
  return `
        <li> <a id="new-review-button" class="btn new-review-button" href="#/new">Add Review<i class="fas fa-plus"></i></a></li>
        <li> <a id="logout-button" class="logout-button" href="#/logout"><i class="fas fa-sign-out-alt"></i>Logout</a></li>
    `;
}

export function generateReviewsListEmptyTemplate() {
  return `
        <div id="reviews-list-empty" class="reviews-list__empty">
            <h2>Tidak ada Review yang tersedia</h2>
            <p>Saat ini, tidak ada Review yang dapat ditampilkan</p>
        </div>
    `;
}

export function generateReviewsListErrorTemplate(message) {
  return `
        <div id="reviews-list-error" class="reviews-list__error">
            <h2>Terjadi kesalahan pengambilan daftar Review</h2>
            <p>${message ? message : "Gunakan jaringan lain atau laporkan error ini."}</p>
        </div>
    `;
}

export function generateReviewItemTemplate({
  id,
  username,
  title,
  description,
  coverUrl,
  createdAt,
}) {
  return `
    <div tabindex="0" class="review-item" data-reviewid="${id}">
          <img class="review-item__image" src="${coverUrl}" alt="${title}">
          <div class="review-item__body">
            <div class="review-item__main">
              <h2 id="review-title" class="review-item__title">${title}</h2>
              <div class="review-item__more-info">
                <div class="review-item__createdat">
                  <i class="fas fa-calendar-alt"></i> ${showFormattedDate(createdAt, "id-ID")}
                </div>
              </div>
            </div>
            <div id="review-description" class="review-item__description">
              ${description}
            </div>
            <div class="review-item__more-info">
              <div class="review-item__author">
                Dibuat oleh: ${username}
              </div>
            </div>
            <a class="btn review-item__read-more" href="#/review/${id}">
              Selengkapnya <i class="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
  `;
}
