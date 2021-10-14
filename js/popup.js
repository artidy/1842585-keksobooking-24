import {BUILDING_TYPES} from './constants.js';
import {
  fillTextContent,
  getPriceDescription,
  getCapacityDescription,
  getCheckDescription,
  filterFeatures,
  fillPhotos,
  fillAvatar, searchNode
} from './utils.js';

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
