import { refs } from './refs/refs';

export const createModal = (content, options) => {
  refs.mainModal.classList.toggle('closed');
  refs.mainModalContent.innerHTML = content;

  const closeModal = e => {
    if (e.target !== e.currentTarget) return;
    refs.mainModal.classList.toggle('closed');
    refs.mainModal.removeEventListener('click', closeModal);
    removeListeners();
  };

  const close = () => {
    refs.mainModal.classList.toggle('closed');
    refs.mainModal.removeEventListener('click', closeModal);
    removeListeners();
  };
  const removeListeners = options(close);

  refs.mainModal.addEventListener('click', closeModal);
};
