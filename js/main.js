import generateAdvertisements from './data.js';

/**
 * Количество авторов объявлений, на каждого автора генерируется одно объявление
 * @constant
 * @type {number}
 * */
const AUTHOR_COUNT = 10;

generateAdvertisements(AUTHOR_COUNT);
