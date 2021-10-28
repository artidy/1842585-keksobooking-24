import {searchNode} from './utils.js';

/**
 * Типы помещений
 * @constant
 * @type {object}
 * */
const BUILDING_TYPES = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};
/**
 * Делитель 10 для получения остатка от числа
 * @constant
 * @type {number}
 * */
const DEV_10 = 10;
/**
 * Делитель 100 для получения остатка от числа
 * @constant
 * @type {number}
 * */
const DEV_100 = 100;
/**
 * Ограничение для определения единственного числа
 * @constant
 * @type {number}
 * */
const RANGE_ONE = 1;
/**
 * Ограничение для определения множественного числа
 * @constant
 * @type {number}
 * */
const RANGE_TWO = 5;
/**
 * Ограничение для определения множественного числа
 * @enum {number}
 * */
const RangeMany = {
  MIN: 11,
  MAX: 20,
};
/**
 * Индекс в массиве для единственного числа
 * @constant
 * @type {number}
 * */
const ONE = 0;
/**
 * Индекс в массиве для множественного числа
 * @constant
 * @type {number}
 * */
const TWO = 1;
/**
 * Индекс в массиве для множественного числа
 * @constant
 * @type {number}
 * */
const MANY = 2;
/**
 * Три варианта для выбора множественного и единственно числа по слову "комната"
 * @constant
 * @type {array<string>>}
 * */
const ROOMS_FORM = ['комната', 'комнаты', 'комнат'];
/**
 * Три варианта для выбора множественного и единственно числа по слову "гость"
 * @constant
 * @type {array<string>>}
 * */
const GUESTS_FORM = ['гостя', 'гостей', 'гостей'];

/**
 * Заполняет текстовое поле на форме
 * @param {HTMLElement} container - элемент в котором необходимо заполнить текст
 * @param {string} text - текст, который необходимо добавить
 * @return {undefined} - функция ничего не возвращает
 */
const fillTextContent = (container, text) => {
  if (text) {
    container.textContent = text;
  } else {
    container.remove();
  }
};
/**
 * Формирует описание цены в рублях
 * @param {number} price - цена аренды
 * @return {string} - описание цены в формате "50000 ₽/ночь"
 */
const getPriceDescription = (price) => price ? `${price} ₽/ночь` : '';
/**
 * Проверяет значение и возвращает слово в подходящей форме
 * @param {array<string>} forms - три формы слова ONE - единственная, TWO - множественная - значение от 2 до 4(включительно) и MANY - множественная(все остальные)
 * @param {number} value - количество предметов
 * @return {string} - слово в единственной или множественной форме
 */
const getDescriptionForm = (forms, value) => {
  const mod10 = value % DEV_10;
  const mod100 = value % DEV_100;

  if (mod100 >= RangeMany.MIN && mod100 <= RangeMany.MAX || mod10 > RANGE_TWO) {
    return forms[MANY];
  } else if (mod10 === RANGE_ONE) {
    return forms[ONE];
  } else if (mod10 > RANGE_ONE && mod10 < RANGE_TWO) {
    return forms[TWO];
  }

  return forms[MANY];
};
/**
 * Формирует описание вместительности помещения
 * @param {number} rooms - количество комнат в помещении
 * @param {number} guests - количество гостей
 * @return {string} - текст в формате "5 комнат для 6 гостей"
 */
const getCapacityDescription = (rooms, guests) => rooms && guests ? `${rooms} ${getDescriptionForm(ROOMS_FORM, rooms)} для ${guests} ${getDescriptionForm(GUESTS_FORM, guests)}` : '';
/**
 * Формирует описание заезда и выезда
 * @param {string} checkIn - время заезда
 * @param {string} checkOut - время выезда
 * @return {string} - текст в формате "Заезд после 12:00, выезд до 13:00"
 */
const getCheckDescription = (checkIn, checkOut) => checkIn && checkOut ? `Заезд после ${checkIn}, выезд до ${checkOut}`: '';
/**
 * Удаляет из шаблона лишние удобства
 * @param {HTMLElement} container - блок со всеми удобствами
 * @param {array<string>} features - список доступных удобств для помещения
 * @return {undefined} - функция ничего не возвращает
 */
const filterFeatures = (container, features) => {
  if (!features || features.length === 0) {
    container.remove();
    return;
  }

  const featuresNodes = container.querySelectorAll('.popup__feature');

  featuresNodes.forEach((featureNode) => {
    if (features.find((feature) => featureNode.classList.contains(`popup__feature--${feature}`))) {
      return;
    }
    featureNode.remove();
  });

  if (featuresNodes.length === 0) {
    container.remove();
  }
};
/**
 * Добавляет на форму фотографии помещения
 * @param {HTMLElement} container - блок с фотографиями
 * @param {array<string>} photos - список фотографий помещений
 * @return {undefined} - функция ничего не возвращает
 */
const fillPhotos = (container, photos) => {
  if (!photos || photos.length === 0) {
    container.remove();
    return;
  }

  const template = container.querySelector('.popup__photo');

  photos.forEach((link) => {
    const photoContainer = template.cloneNode();
    photoContainer.src = link;
    container.append(photoContainer);
  });

  template.remove();
};
/**
 * Устанавливает аватар автора объявления
 * @param {HTMLElement} container - блок для аватара пользователя
 * @param {string} link - ссылка на аватар автора
 * @return {undefined} - функция ничего не возвращает
 */
const fillAvatar = (container, link) => {
  if (!link) {
    container.remove();
  } else {
    container.src = link;
  }
};
/**
 * Создает и возвращает модальное окно с переданными значениями
 * @param {object} advertisement - предложение об аренде
 * @param {HTMLElement} template - шаблон модального окна
 * @param {string} selector - селектор модального окна
 * @return {Node} - модальное окно с заполненными значениями.
 */
const createPopup = (advertisement, template, selector) => {
  const popupTemplate = template.querySelector(selector);
  const popup = popupTemplate.cloneNode(true);
  const {offer, author} = advertisement;

  fillTextContent(searchNode(popup, '.popup__title'), offer.title);
  fillTextContent(searchNode(popup, '.popup__text--address'), offer.address);
  fillTextContent(searchNode(popup, '.popup__text--price'), getPriceDescription(offer.price));
  fillTextContent(searchNode(popup, '.popup__type'), BUILDING_TYPES[offer.type]);
  fillTextContent(searchNode(popup, '.popup__text--capacity'), getCapacityDescription(offer.rooms, offer.guests));
  fillTextContent(searchNode(popup, '.popup__text--time'), getCheckDescription(offer.checkin, offer.checkout));
  filterFeatures(searchNode(popup, '.popup__features'), offer.features);
  fillTextContent(searchNode(popup, '.popup__description'), offer.description);
  fillPhotos(searchNode(popup, '.popup__photos'), offer.photos);
  fillAvatar(searchNode(popup, '.popup__avatar'), author.avatar);

  return popup;
};

export {createPopup};
