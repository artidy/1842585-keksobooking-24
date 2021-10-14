/**
 * Граница чисел, которым необходимо установить лидирующий ноль.
 * @constant
 * @type {number}
 * */
const LIMIT_NUMBER_FOR_ZERO = 10;

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
 * Путь к директории изображений
 * @constant
 * @type {string}
 * */
const PUBLIC_PATH = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/';

/**
 * Фотографии местоположения помещения
 * @constant
 * @type {array<string>}
 * */
const PHOTOS_PATH = [
  'duonguyen-8LrGtIxxa4w.jpg',
  'brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'claire-rendall-b6kAwr1i0Iw.jpg',
];

export {
  LIMIT_NUMBER_FOR_ZERO,
  BUILDING_TYPES,
  TITLES_VALUE,
  DESCRIPTIONS_VALUE,
  LATITUDE_RANGE,
  LONGITUDE_RANGE,
  PRICE_RANGE,
  ROOMS_RANGE,
  GUESTS_COUNT,
  CHECK_VALUES,
  FUTURES,
  PUBLIC_PATH,
  PHOTOS_PATH
};
