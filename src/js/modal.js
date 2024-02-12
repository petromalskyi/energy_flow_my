const buttonOpenModalEl = document.querySelector('.js-open-modal');
const buttonCloseModalEl = document.querySelector('.js-close-modal');
const backdropEl = document.querySelector('.header-backdrop');

buttonOpenModalEl.addEventListener('click', openModal);
buttonCloseModalEl.addEventListener('click', openModal);

// document.addEventListener('keydown', onEscapePress);

function openModal() {
  backdropEl.classList.toggle('is-hidden');
}

// function onEscapePress(event) {
//   if (event.code !== 'Escape') return;
//   backdropEl.classList.toggle('is-hidden');
//   document.removeEventListener('keydown', onEscapePress);
// }
