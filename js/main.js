import generateAdvertisements from './data.js';
import {createPopup} from './popup.js';
import {activateForm, deactivateForm, findChildren} from './form.js';

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

const advertisements = generateAdvertisements(OFFER_COUNT);

const canvas = document.querySelector('#map-canvas');
const popupTemplate = document.querySelector('#card').content;

const popup = createPopup(advertisements[TARGET_OFFER], popupTemplate, '.popup');
canvas.append(popup);

const addForm = document.querySelector('.ad-form');
const addElements = findChildren(addForm, CONTROL_SELECTORS);
deactivateForm(addForm, DISABLE_CLASS, addElements);
activateForm(addForm, DISABLE_CLASS, addElements);

const filterForm = document.querySelector('.map__filters');
const filterElements = findChildren(filterForm, CONTROL_SELECTORS);
deactivateForm(filterForm, DISABLE_CLASS, filterElements);
activateForm(filterForm, DISABLE_CLASS, filterElements);
