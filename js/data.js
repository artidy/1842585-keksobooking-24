import {
  generateRandomNumber,
  getAvatarNumber,
  getRandomLocation,
  getRandomValueFromArray,
  getSomeValuesFromArray
} from './utils.js';

/**
 * Граница чисел, которым необходимо установить лидирующий ноль.
 * @constant
 * @type {number}
 * */
const LIMIT_NUMBER_FOR_ZERO = 10;

/**
 * Типы помещений
 * @constant
 * @type {array<string>}
 * */
const BUILDING_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

/**
 * Заголовок для каждого типа помещений
 * @constant
 * @type {object}
 * */
const TITLES_VALUE = {
  palace: 'Усадьба Салтыковых-Чертковых',
  flat: 'Сдаётся однокомнатная квартира на долгосрочную аренду',
  house: 'Гостевой домик в черте города',
  bungalow: 'Бунгало от 1 до 6 людей',
  hotel: 'Altyn Eco Park',
};

/**
 * Описание для каждого типа помещений
 * @constant
 * @type {object}
 * */
const DESCRIPTIONS_VALUE = {
  palace: 'Историческая усадьба 18 века в самом центре Москвы замечательно подходит для проведения различных мероприятий. Усадьба Салтыковых – готовая декорация для воплощения любой, даже самой смелой идеи на Вашем торжестве.',
  flat: 'Срочно! Сдаётся 1-комнатная квартира на длительный срок. Теплая, чистая., уютная.',
  house: 'Дом для отпуска «Гостевой домик в черте города»',
  bungalow: 'Шале на воде, с фехтование, уникальные для собак.',
  hotel: 'Отель Altyn Eco Park с общим лаунджем, бесплатной частной парковкой и бесплатным Wi-Fi на всей территории расположен в городе Нур-Султан, примерно в 1,9 км от монумента «Байтерек»',
};

/**
 * Диапазон широты, для генерации случайного местоположения
 * @enum {number}
 * */
const LATITUDE_RANGE = {
  MIN: 35.65000,
  MAX: 35.70000,
  DECIMALS: 5,
};

/**
 * Диапазон долготы, для генерации случайного местоположения
 * @enum {number}
 * */
const LONGITUDE_RANGE = {
  MIN: 139.70000,
  MAX: 139.80000,
  DECIMALS: 5,
};

/**
 * Диапазон цен, для генерации случайного значения
 * @enum {number}
 * */
const PRICE_RANGE = {
  MIN: 100000,
  MAX: 600000,
};

/**
 * Диапазон количества комнат, для генерации случайного значения
 * @enum {number}
 * */
const ROOMS_RANGE = {
  MIN: 1,
  MAX: 30,
};

/**
 * Диапазон количества гостей, для генерации случайного значения
 * @enum {number}
 * */
const GUESTS_COUNT = {
  MIN: 1,
  MAX: 10,
};

/**
 * Время заезда и выезда
 * @constant
 * @type {array<string>}
 * */
const CHECK_VALUES = ['12:00', '13:00', '14:00'];

/**
 * Список дополнительных услуг
 * @constant
 * @type {array<string>}
 * */
const FUTURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

/**
 * Фотографии местоположения помещения
 * @constant
 * @type {array<string>}
 * */
const PHOTOS_PATH = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

/**
 * Создает объявление со случайными данными.
 * @param {number} count - идентификатор пользователя
 * @return {object} - объект объявления со случайными данными.
 */
const createOffer = (count) => {
  const location = getRandomLocation(LATITUDE_RANGE, LONGITUDE_RANGE);
  const type = getRandomValueFromArray(BUILDING_TYPES);

  return {
    author: {
      avatar: `img/avatars/user${getAvatarNumber(count, LIMIT_NUMBER_FOR_ZERO)}.png`,
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
const generateAdvertisements = (count) => new Array(count).fill('').map(createOffer, count);

export default generateAdvertisements;
