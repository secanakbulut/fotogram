// gallery

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

// modal

let currentIndex = 0;

function updateModalContent() {
  const photo = PHOTOS[currentIndex];
  const img = document.getElementById("modal-image");

  img.style.visibility = "hidden";
  img.src = photo.src;
  img.alt = photo.alt;
  img.onload = function() {
    img.style.visibility = "visible";
  };

  document.getElementById("modal-title").textContent = photo.title;
  document.getElementById("modal-caption").textContent = photo.alt;
  document.getElementById("photo-counter").textContent = currentIndex + 1 + "/" + PHOTOS.length;
}

function openModal(index) {
  currentIndex = index;
  updateModalContent();
  document.getElementById("photo-modal").showModal();
}

function closeModal() {
  document.getElementById("photo-modal").close();
}

// eine funktion für vor und zurück, direction = 1 oder -1
function changePhoto(direction) {
  currentIndex = currentIndex + direction;
  if (currentIndex >= PHOTOS.length) {
    currentIndex = 0;
  }
  if (currentIndex < 0) {
    currentIndex = PHOTOS.length - 1;
  }
  updateModalContent();
}

function handleBackdropClick(event) {
  if (event.target === document.getElementById("photo-modal")) {
    closeModal();
  }
}

function handleKeydown(event) {
  const modal = document.getElementById("photo-modal");

  if (!modal.open) {
    return;
  }

  if (event.key === "ArrowRight") {
    changePhoto(1);
  }

  if (event.key === "ArrowLeft") {
    changePhoto(-1);
  }
}

function setupModalListeners() {
  document.getElementById("close-btn").addEventListener("click", closeModal);
  document.getElementById("next-btn").addEventListener("click", function() { changePhoto(1); });
  document.getElementById("prev-btn").addEventListener("click", function() { changePhoto(-1); });
  document.getElementById("photo-modal").addEventListener("click", handleBackdropClick);
  document.addEventListener("keydown", handleKeydown);
}

// init wird vom body onload aufgerufen
function init() {
  renderGallery();
  setupModalListeners();
}
