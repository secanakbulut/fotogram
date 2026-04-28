let currentIndex = 0;

function updateModalContent() {
  const photo = PHOTOS[currentIndex];

  document.getElementById("modal-image").src = photo.src;
  document.getElementById("modal-image").alt = photo.alt;
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

function showNextPhoto() {
  currentIndex = currentIndex + 1;
  if (currentIndex >= PHOTOS.length) {
    currentIndex = 0;
  }
  updateModalContent();
}

function showPrevPhoto() {
  currentIndex = currentIndex - 1;
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
    showNextPhoto();
  }

  if (event.key === "ArrowLeft") {
    showPrevPhoto();
  }
}

function setupModalListeners() {
  document.getElementById("close-btn").addEventListener("click", closeModal);
  document.getElementById("next-btn").addEventListener("click", showNextPhoto);
  document.getElementById("prev-btn").addEventListener("click", showPrevPhoto);
  document.getElementById("photo-modal").addEventListener("click", handleBackdropClick);
  document.addEventListener("keydown", handleKeydown);
}
