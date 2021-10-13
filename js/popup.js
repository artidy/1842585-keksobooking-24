import {BUILDING_TYPES} from './constants.js';
import {
  fillTextContent,
  getPriceDescription,
  getCapacityDescription,
  getCheckDescription,
  filterFeatures,
  fillLinks,
  fillAvatar
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

  fillTextContent(popup, '.popup__title', advertisement.offer.title);
  fillTextContent(popup, '.popup__text--address', advertisement.offer.address);
  fillTextContent(popup, '.popup__text--price', getPriceDescription(advertisement.offer.price));
  fillTextContent(popup, '.popup__type', BUILDING_TYPES[advertisement.offer.type]);
  fillTextContent(popup, '.popup__text--capacity', getCapacityDescription(advertisement.offer.rooms, advertisement.offer.guests));
  fillTextContent(popup, '.popup__text--time', getCheckDescription(advertisement.offer.checkin, advertisement.offer.checkout));
  filterFeatures(popup, '.popup__features', advertisement.offer.features);
  fillTextContent(popup, '.popup__description', advertisement.offer.description);
  fillLinks(popup, '.popup__photos', advertisement.offer.photos);
  fillAvatar(popup, '.popup__avatar', advertisement.author.avatar);

  return popup;
};

export {createPopup};
