import { isEscapeKey } from './util.js';
import {pristine} from './validation.js';
import {resetScale} from './picture-size.js';
import { resetEffects } from './picture-effect.js';

const body = document.querySelector('body');
const uploadFile = body.querySelector('#upload-file');
const uploadModal = body.querySelector('.img-upload__overlay');
const uploadFileClose = uploadModal.querySelector('.img-upload__cancel');
const uploadForm = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const imgUploadPreviewElement = uploadForm.querySelector('.img-upload__preview');
const hashtagsInputElement = uploadForm.querySelector('.text__hashtags');
const commentTextareaElement = uploadForm.querySelector('.text__description');
const effectsListElements = uploadForm.querySelectorAll('.effects__list input');


let isUploadFormSending = false;


const closeModal = () => {
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadForm.reset();
  resetScale();
  resetEffects();
};

const onInputKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {//Проверить, что инпут не в фокусе
    evt.preventDefault();
    closeModal();
  }
}

const showModal = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  uploadFileClose.addEventListener('click', () => {
    closeModal();
  });
  // Отмена закрытия модального окана, когда фокус в поле ввода хеш-тегов
  hashtagsInputElement.addEventListener('keydown', onInputKeyDown);

  // Отмена закрытия модального окана, когда фокус в поле ввода комментариев
  commentTextareaElement.addEventListener('keydown', onInputKeyDown);
  document.addEventListener('keydown', onDocumentKeydown);

  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (!isValid) {
      return;
    }

    isUploadFormSending = true;
  });
};

let currentEffect = undefined;
let previousEffect = undefined;

const initForm = () => {
  uploadFile.addEventListener('change', (evt) => {
    showModal();
  });
  effectsListElements.forEach((element) => element.addEventListener('click', (evt) => {
    previousEffect = currentEffect;
    currentEffect = evt.currentTarget.value;
    if(previousEffect) {
      imgUploadPreviewElement.classList.remove(`effects__preview--${previousEffect}`);
    }
    if(currentEffect !== 'none') {
      imgUploadPreviewElement.classList.add(`effects__preview--${currentEffect}`);
    }
    imgUploadPreviewElement.style = 'filter:sepia(0.5 )';
  }));
};


export {initForm};
