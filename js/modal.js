document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  const modalClose = document.getElementById('modal-close');

  // Attach to stable parent
  const mediaContainer = document.getElementById('media');

  mediaContainer.addEventListener('click', (e) => {
    const target = e.target;
    if (target.classList.contains('gallery-image')) {
      modalImg.src = target.src;
      modal.style.display = 'flex';
    }
  });

  modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
});