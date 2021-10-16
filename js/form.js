/**
 * Имя класса для отключения формы
 * @constant
 * @type {string}
 * */
const DISABLE_CLASS = 'ad-form--disabled';
/**
 * Подчиненные элементы, которые необходимо обработать
 * @constant
 * @type {array<string>}
 * */
const CONTROL_SELECTORS = ['select', 'fieldset'];
/**
 * Минимальная стоимость аренды для типов помещений
 * @constant
 * @type {object}
 * */
const TYPE_MIN_PRICE = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const formFilter = document.querySelector('.map__filters');
const formAdd = document.querySelector('.ad-form');
const title = formAdd.querySelector('#title');
const timeIn = formAdd.querySelector('#timein');
const timeOut = formAdd.querySelector('#timeout');
const price = document.querySelector('#price');
const type = document.querySelector('#type');
const rooms = document.querySelector('#room_number');
const guests = document.querySelector('#capacity');

/**
 * Возвращает подчиненные элементы на форме по селекторам
 * @param {HTMLElement} form - форма родитель
 * @return {array<HTMLElement>} - массив подчиненных элементов
 */
const findChildren = (form) => CONTROL_SELECTORS.map((selector) => Array.from(form.querySelectorAll(selector))).flat();

const changeType = (current) => {
  const minPrice = TYPE_MIN_PRICE[current];
  price.setAttribute('placeholder', minPrice);
  price.setAttribute('min', minPrice);
};

const checkInputValidity = (inputElement) => {
  const validity = inputElement.validity;
  if (validity.valueMissing) {
    inputElement.setCustomValidity('Поле обязательно для заполнения');
  } else if (validity.tooShort) {
    inputElement.setCustomValidity(`Минимум ${inputElement.getAttribute('minlength')}, сейчас ${inputElement.value.length}`);
  } else if (validity.tooLong) {
    inputElement.setCustomValidity(`Максимум ${inputElement.getAttribute('maxlength')}, сейчас ${inputElement.value.length}`);
  } else {
    inputElement.setCustomValidity('');
  }

  inputElement.reportValidity();
};

const changeGuests = () => {
  const roomsCount = +rooms.value;
  const count = +guests.value;
  if (roomsCount === 100 && count !== 0 ||
    roomsCount !== 100 && (count === 0 || count > roomsCount)) {
    guests.setCustomValidity('Неправильно выбрано возможное количество гостей');
  } else {
    guests.setCustomValidity('');
  }
  guests.reportValidity();
};

/**
 * Активирует форму и все подчиненные элементы
 * @param {HTMLElement} form - форма родитель
 * @param {array<HTMLElement>} formElements - массив подчиненных элементов
 * @return {undefined} - функция ничего не возвращает
 */
const activateForm = (form, formElements) => {
  form.classList.remove(DISABLE_CLASS);
  formElements.forEach((formElement) => {
    formElement.removeAttribute('disabled');
  });
};

/**
 * Отключает форму и все подчиненные элементы
 * @param {HTMLElement} form - форма родитель
 * @param {array<HTMLElement>} formElements - массив подчиненных элементов
 * @return {undefined} - функция ничего не возвращает
 */
const deactivateForm = (form, formElements) => {
  form.classList.add(DISABLE_CLASS);
  formElements.forEach((formElement) => {
    formElement.setAttribute('disabled', 'disabled');
  });
};

const changeTime = (checkTimeElement, value) => {
  checkTimeElement.value = value;
};

const onGuestsChange = () => {
  changeGuests();
};

const onInputCheck = (evt) => {
  checkInputValidity(evt.target);
};

const onTypeChange = (evt) => {
  changeType(evt.target.value);
};

const onTimeInChange = (evt) => {
  changeTime(timeIn, evt.target.value);
};

const onTimeOutChange = (evt) => {
  changeTime(timeOut, evt.target.value);
};

title.addEventListener('input', onInputCheck);
price.addEventListener('input', onInputCheck);
type.addEventListener('change', onTypeChange);
timeIn.addEventListener('change', onTimeOutChange);
timeOut.addEventListener('change', onTimeInChange);
rooms.addEventListener('change', onGuestsChange);
guests.addEventListener('change', onGuestsChange);

const formFilterChildren = findChildren(formFilter);
const formAddChildren = findChildren(formAdd);

deactivateForm(formFilter, formFilterChildren);
deactivateForm(formAdd, formAddChildren);
activateForm(formFilter, formFilterChildren);
activateForm(formAdd, formAddChildren);
changeTime(timeOut, timeIn.value);
changeGuests(rooms.value);
changeType(type.value);
