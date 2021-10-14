import {
  generateRandomNumber,
  getAvatarNumber,
  getRandomLocation,
  getRandomValueFromArray,
  getSomeValuesFromArray
} from './utils.js';
import {
  BUILDING_TYPES, CHECK_VALUES, DESCRIPTIONS_VALUE, FUTURES, GUESTS_COUNT,
  LATITUDE_RANGE,
  LIMIT_NUMBER_FOR_ZERO,
  LONGITUDE_RANGE, PHOTOS_PATH,
  PRICE_RANGE, ROOMS_RANGE,
  TITLES_VALUE
} from './constants.js';

/**
 * Создает объявление со случайными данными.
 * @param {any} value - значение массива
 * @param {number} avatarIndex - индекс значения массива
 * @return {object} - объект объявления со случайными данными.
 */
const createOffer = (value, avatarIndex) => {
  const location = getRandomLocation(LATITUDE_RANGE, LONGITUDE_RANGE);
  const type = getRandomValueFromArray(Object.keys(BUILDING_TYPES));
  return {
    author: {
      avatar: `img/avatars/user${getAvatarNumber(++avatarIndex, LIMIT_NUMBER_FOR_ZERO)}.png`,
    },
    offer: {
      title: TITLES_VALUE[type],
      address: `${location.lat}, ${location.lng}`,
      price: generateRandomNumber(PRICE_RANGE.MIN, PRICE_RANGE.MAX),
      type,
      rooms: generateRandomNumber(ROOMS_RANGE.MIN, ROOMS_RANGE.MAX),
      guests: generateRandomNumber(GUESTS_COUNT.MIN, GUESTS_COUNT.MAX),
      checkin: getRandomValueFromArray(CHECK_VALUES),
      checkout: getRandomValueFromArray(CHECK_VALUES),
      features: getSomeValuesFromArray(FUTURES),
      description: DESCRIPTIONS_VALUE[type],
      photos: getSomeValuesFromArray(PHOTOS_PATH),
    },
    location,
  };
};

/**
 * Генерирует массив объявлений
 * @param {number} count - количество объявлений
 * @return {array} - массив объявлений со случайными данными.
 */
const generateAdvertisements = (count) => new Array(count).fill('').map(createOffer);

export default generateAdvertisements;
