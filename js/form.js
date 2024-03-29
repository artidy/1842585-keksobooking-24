import {sendSuccess} from './notification.js';
import {findChildren, searchNode} from './utils.js';
import {resetPreviews} from './preview.js';

/**
 * Имя класса для отключения формы
 * @constant
 * @type {string}
 * */
const DISABLE_CLASS = 'ad-form--disabled';

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

/**
 * Имя класса для отключения формы
 * @constant
 * @type {number}
 * */
const MIN_GUEST_LIMIT = 0;

/**
 * Имя класса для отключения формы
 * @constant
 * @type {number}
 * */
const MAX_ROOMS_LIMIT = 100;

/**
 * Количество знаков после запятой
 * @constant
 * @type {number}
 * */
const FIXED_VALUE = 5;

const formFilter = searchNode(document, '.map__filters');
const formAdd = searchNode(document, '.ad-form');
const formFilterChildren = findChildren(formFilter);
const formAddChildren = findChildren(formAdd);
const title = searchNode(formAdd, '#title');
const timeIn = searchNode(formAdd, '#timein');
const timeOut = searchNode(formAdd, '#timeout');
const price = searchNode(document, '#price');
const type = searchNode(document, '#type');
const rooms = searchNode(document, '#room_number');
const guests = searchNode(document, '#capacity');
const locationField = searchNode(formAdd, '#address');
const resetButton = searchNode(formAdd, '[type="reset"]');

/**
 * Изменяет атрибуты поля цены аренды
 * @param {string} current - тип помещения
 * @return {undefined} - Функция ничего не возвращает
 */
const changeType = (current) => {
  const minPrice = TYPE_MIN_PRICE[current];

  price.setAttribute('placeholder', minPrice);
  price.setAttribute('min', minPrice);
};

/**
 * Проверяет валидность введенных данных в поле input
 * @param {HTMLElement} element - тип помещения
 * @return {undefined} - Функция ничего не возвращает
 */
const checkInputValidity = (element) => {
  const validity = element.validity;

  if (validity.valueMissing) {
    element.setCustomValidity('Поле обязательно для заполнения');
  } else if (validity.tooShort) {
    element.setCustomValidity(`Минимум ${element.getAttribute('minlength')}, сейчас ${element.value.length}`);
  } else if (validity.tooLong) {
    element.setCustomValidity(`Максимум ${element.getAttribute('maxlength')}, сейчас ${element.value.length}`);
  } else {
    element.setCustomValidity('');
  }

  element.reportValidity();
};

/**
 * Проверяет валидность выбранных данных для поля гость
 * @return {undefined} - Функция ничего не возвращает
 */
const changeGuests = () => {
  const roomsCount = +rooms.value;
  const count = +guests.value;

  if (roomsCount === MAX_ROOMS_LIMIT && count !== MIN_GUEST_LIMIT ||
    roomsCount !== MAX_ROOMS_LIMIT && (count === MIN_GUEST_LIMIT || count > roomsCount)) {
    guests.setCustomValidity('Неправильно выбрано возможное количество гостей');
  } else {
    guests.setCustomValidity('');
  }

  guests.reportValidity();
};

/**
 * Активирует форму и все подчиненные элементы
 * @param {HTMLElement} element - форма родитель
 * @param {array<HTMLElement>} children - массив подчиненных элементов
 * @return {undefined} - функция ничего не возвращает
 */
const activateForm = (element, children) => {
  element.classList.remove(DISABLE_CLASS);
  children.forEach((child) => {
    child.removeAttribute('disabled');
  });
};

/**
 * Отключает форму и все подчиненные элементы
 * @param {HTMLElement} element - форма родитель
 * @param {array<HTMLElement>} children - массив подчиненных элементов
 * @return {undefined} - функция ничего не возвращает
 */
const deactivateForm = (element, children) => {
  element.classList.add(DISABLE_CLASS);
  children.forEach((child) => {
    child.setAttribute('disabled', 'disabled');
  });
};

/**
 * Отключает все формы и все подчиненные элементы
 * @return {undefined} - функция ничего не возвращает
 */
const deactivateForms = () => {
  deactivateForm(formFilter, formFilterChildren);
  deactivateForm(formAdd, formAddChildren);
};

/**
 * Активирует все формы и все подчиненные элементы
 * @return {undefined} - функция ничего не возвращает
 */
const activateForms = () => {
  activateForm(formFilter, formFilterChildren);
  activateForm(formAdd, formAddChildren);
};

/**
 * Переключает время заезда или выезда
 * @param {HTMLElement} checkTimeElement - блок выбора времени заезда или выезда
 * @param {string} value - значение времени
 * @return {undefined} - функция ничего не возвращает
 */
const changeTime = (checkTimeElement, value) => checkTimeElement.value = value;

/**
 * Устанавливает значение координат точки на карте
 * @param {object} buildingLocation - координаты выбранные на карте
 * @return {undefined} - функция ничего не возвращает
 */
const setLocation = (buildingLocation) => locationField.value = `${buildingLocation.lat.toFixed(FIXED_VALUE)}, ${buildingLocation.lng.toFixed(FIXED_VALUE)}`;

/**
 * Сбрасывает данные на всех формах
 * @return {undefined} - функция ничего не возвращает
 */
const resetForms = () => {
  resetPreviews();
  formFilter.reset();
  formAdd.reset();
  changeType(type.value);
};

const onGuestsChange = () => changeGuests();

const onInputCheck = (evt) => checkInputValidity(evt.target);

const onTypeChange = (evt) => changeType(evt.target.value);

const onTimeInChange = (evt) => changeTime(timeIn, evt.target.value);

const onTimeOutChange = (evt) => changeTime(timeOut, evt.target.value);

/**
 * Инициализирует начальные значения формы и активирует слушателей событий
 * @param {function} postData - функция отправки данных на сервер
 * @param {function} getCurrentLocation - функция получения текущих координат метки с карты
 * @param {function} onUpdateData - функция для получения данных с сервера и обновления карты
 * @return {undefined} - функция ничего не возвращает
 */
const initForm = (postData, getCurrentLocation, onUpdateData) => {
  const resetData = () => {
    resetForms();
    setLocation(getCurrentLocation());
  };

  const onDataSent = () => {
    sendSuccess('Данные успешно сохранены на сервере!');
    resetData();
  };

  const onAddFormSubmit = (evt) => {
    evt.preventDefault();
    const formData = new FormData(formAdd);
    postData(onDataSent, formData, onUpdateData);
  };

  const onResetBtnClick = (evt) => {
    evt.preventDefault();
    resetData();
    onUpdateData();
  };

  title.addEventListener('input', onInputCheck);
  price.addEventListener('input', onInputCheck);
  type.addEventListener('change', onTypeChange);
  timeIn.addEventListener('change', onTimeOutChange);
  timeOut.addEventListener('change', onTimeInChange);
  rooms.addEventListener('change', onGuestsChange);
  guests.addEventListener('change', onGuestsChange);
  formAdd.addEventListener('submit', onAddFormSubmit);
  resetButton.addEventListener('click', onResetBtnClick);

  changeTime(timeOut, timeIn.value);
  changeGuests();
  changeType(type.value);
  setLocation(getCurrentLocation());
  deactivateForms();
};

export {deactivateForms, activateForms, resetForms, setLocation, initForm};
