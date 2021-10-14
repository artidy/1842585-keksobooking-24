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
const LatitudeRange = {
  MIN: 35.65000,
  MAX: 35.70000,
  DECIMALS: 5,
};

/**
 * Диапазон долготы, для генерации случайного местоположения
 * @enum {number}
 * */
const LongitudeRange = {
  MIN: 139.70000,
  MAX: 139.80000,
  DECIMALS: 5,
};

/**
 * Диапазон цен, для генерации случайного значения
 * @enum {number}
 * */
const PriceRange = {
  MIN: 100000,
  MAX: 600000,
};

/**
 * Диапазон количества комнат, для генерации случайного значения
 * @enum {number}
 * */
const RoomsRange = {
  MIN: 1,
  MAX: 30,
};

/**
 * Диапазон количества гостей, для генерации случайного значения
 * @enum {number}
 * */
const GuestCount = {
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

export {
  LIMIT_NUMBER_FOR_ZERO,
  BUILDING_TYPES,
  TITLES_VALUE,
  DESCRIPTIONS_VALUE,
  LatitudeRange,
  LongitudeRange,
  PriceRange,
  RoomsRange,
  GuestCount,
  CHECK_VALUES,
  FUTURES,
  PUBLIC_PATH,
  PHOTOS_PATH,
  DEV_10,
  DEV_100,
  RANGE_ONE,
  RANGE_TWO,
  RangeMany,
  ONE,
  TWO,
  MANY,
  ROOMS_FORM,
  GUESTS_FORM
};
