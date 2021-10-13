import generateAdvertisements from './data.js';
import {createPopup} from './popup.js';

/**
 * Количество объявлений
 * @constant
 * @type {number}
 * */
const OFFER_COUNT = 10;

const advertisements = generateAdvertisements(OFFER_COUNT);

const canvas = document.querySelector('#map-canvas');
const popupTemplate = document.querySelector('#card').content;

for (let i = 4; i < 5; i++) {
  const popup = createPopup(advertisements[i], popupTemplate, '.popup');
  canvas.append(popup);
}
