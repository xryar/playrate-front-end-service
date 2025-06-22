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
  title,
  description,
  coverUrl,
  createdAt,
}) {}
