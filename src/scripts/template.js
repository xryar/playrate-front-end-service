import { showFormattedDate } from "./utils";

export function generateLoaderTemplate() {
  return `
    <div class="loader"></div>
  `;
}

export function generateLoaderAbsoluteTemplate() {
  return `
        <div class="flex justify-center items-center w-full h-32">
           <svg class="animate-spin h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
             <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
             <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
           </svg>
        </div>
    `;
}

export function generateUnauthenticatedNavigationListTemplate() {
  return `
        <li> 
          <a id="login-button" href="#/login"
            class="px-4 py-2 rounded hover:bg-gray-100 text-sm font-medium text-gray-700 transition">
            Login
          </a>
        </li>
        <li> 
          <a id="register-button" href="#/register"
            class="px-4 py-2 rounded hover:bg-gray-100 text-sm font-medium text-gray-700 transition">
            Register
          </a>
        </li>
    `;
}

export function generateAuthenticatedNavigationListTemplate() {
  return `
        <li> 
          <a id="new-review-button" href="#/new"
            class="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded hover:bg-primary-hover transition font-medium">
            <i class="fas fa-plus"></i> Add Review
          </a>
        </li>
        <li> 
          <a id="logout-button" href="#/logout"
            class="inline-flex items-center gap-2 text-red-600 font-semibold hover:underline">
            <i class="fas fa-sign-out-alt"></i> Logout
          </a>
        </li>
    `;
}

export function generateReviewsListEmptyTemplate() {
  return `
     <div class="text-center text-gray-600 py-16">
         <h2 class="text-2xl font-semibold">Tidak ada Review yang tersedia</h2>
         <p>Saat ini, tidak ada Review yang dapat ditampilkan</p>
     </div>
  `;
}

export function generateReviewsListErrorTemplate(message) {
  return `
     <div class="text-center text-red-500 py-16">
         <h2 class="text-2xl font-semibold">Terjadi kesalahan pengambilan daftar Review</h2>
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
    <div tabindex="0" data-reviewid="${id}" class="rounded-xl border border-gray-200 bg-white overflow-hidden shadow hover:shadow-md transition">
      <img src="${coverUrl}" alt="${title}" class="w-full h-64 object-cover object-center">
      <div class="px-6 py-5 space-y-4">
        
        <div>
          <h2 id="review-title" class="text-xl font-bold text-gray-800">${title}</h2>
           <div class="flex items-center gap-2 text-sm text-gray-500 mt-1">
             <i class="fas fa-calendar-alt"></i> ${showFormattedDate(createdAt, "id-ID")}
           </div>
        </div>
        
        <p id="review-description" class="text-gray-700 line-clamp-4">${description}</p>
        
        <div class="text-sm text-gray-600">
           Dibuat oleh: <span class="font-medium text-gray-800">${username}</span>
        </div>
        
        <a href="#/reviews/${id}" class="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover transition">
          Selengkapnya <i class="fas fa-arrow-right"></i>
        </a>
      </div>
    </div>
  `;
}

export function generateReviewDetailTemplate({
  title,
  coverUrl,
  description,
  username,
  createdAt,
}) {
  const createdAtFormatted = showFormattedDate(createdAt, "id-ID");

  return `
    <section class="min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-b from-white to-secondary">
        <div class="w-full max-w-2xl bg-white rounded-lg shadow-md p-6 space-y-6">
            <!-- Judul -->
            <h1 class="text-2xl font-bold text-gray-800 text-center">${title}</h1>
            
            <!-- Gambar -->
            <div class="w-full">
                <img src="${coverUrl}" alt="cover image"
                 class="w-full h-auto max-h-[400px] object-cover rounded-md border"/>
            </div>
            
            <!-- Info -->
            <div class="space-y-2">
                <div class="flex items-center justify-between text-sm text-gray-500">
                    <span><i class="fas fa-calendar-alt mr-1"></i> ${createdAtFormatted}</span>
                    <span>Dibuat Oleh: <span class="font-medium text-gray-700">${username}</span></span>
                </div>
                
                <!-- Deskripsi -->
                <div>
                    <h2 class="text-lg font-semibold mb-2 text-gray-800">Deskripsi</h2>
                    <p class="text-gray-700 whitespace-pre-line leading-relaxed">${description}</p>
                </div>
            </div>
        </div>
    </section>
  `;
}

export function generateReviewDetailErrorTemplate(message) {
  return `
    <section class="min-h-screen flex items-center justify-center px-4 py-10">
      <div class="text-center bg-red-50 text-red-800 border border-red-200 rounded p-6 max-w-md">
        <h2 class="text-lg font-semibold mb-2">Terjadi kesalahan</h2>
        <p>${message ? message : "Gunakan jaringan lain atau laporkan error ini."}</p>
      </div>
    </section>
  `;
}
