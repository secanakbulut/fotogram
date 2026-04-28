function renderThumbnail(photo, index) {
  return `
    <article class="photo-card" role="listitem">
      <button
        class="photo-btn"
        onclick="openModal(${index})"
        aria-label="Foto öffnen: ${photo.alt}"
      >
        <img
          class="photo-thumbnail"
          src="${photo.thumbnail}"
          alt="${photo.alt}"
          loading="lazy"
        />
      </button>
    </article>
  `;
}

function renderGallery() {
  const gallery = document.getElementById("gallery");
  let galleryHTML = "";

  for (let i = 0; i < PHOTOS.length; i++) {
    galleryHTML += renderThumbnail(PHOTOS[i], i);
  }

  gallery.innerHTML = galleryHTML;
}
