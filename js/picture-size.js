const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const START_SCALE = 100;

const imageElement = document.querySelector('.img-upload__preview');
const smallerButtonElement = document.querySelector('.scale__control--smaller');
const biggerButtonElement = document.querySelector('.scale__control--bigger');
const scaleInputElement = document.querySelector('.scale__control--value');

//Функция изменения масштаба картинки

const scaleImage = (value) => {
  imageElement.style.transform = `scale(${value / 100})`;
  scaleInputElement.value = `${value}%`;
};

//Функция увеличения картинки при нажатии на кнопку

const onSmallerButtonClick = () => {
  const currentValue = parseInt(scaleInputElement.value,10);
  let newValue = currentValue - SCALE_STEP;
  if (newValue < MIN_SCALE) {
    newValue = MIN_SCALE;
  }
  scaleImage(newValue);
};

//Функция уменьшения картинки при нажатии на кнопку

const onBiggerButtonClick = () => {
  const currentValue = parseInt(scaleInputElement.value,10);
  let newValue = currentValue + SCALE_STEP;
  if (newValue > MAX_SCALE) {
    newValue = MAX_SCALE;
  }
  scaleImage(newValue);
};

//Функция к возврату картинки в первозданный облик

const resetScale = () => scaleImage(START_SCALE);

smallerButtonElement.addEventListener('click', onSmallerButtonClick);
biggerButtonElement.addEventListener('click', onBiggerButtonClick);

export {resetScale};
