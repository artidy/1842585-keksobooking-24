import generateAdvertisements from './data.js';
import {createPopup} from './popup.js';
import './form.js';

/**
 * Количество объявлений
 * @constant
 * @type {number}
 * */
const OFFER_COUNT = 10;
/**
 * Объявление для вывода на форму
 * @constant
 * @type {number}
 * */
const TARGET_OFFER = 5;

const advertisements = generateAdvertisements(OFFER_COUNT);

const canvas = document.querySelector('#map-canvas');
const popupTemplate = document.querySelector('#card').content;

const popup = createPopup(advertisements[TARGET_OFFER], popupTemplate, '.popup');
canvas.append(popup);
