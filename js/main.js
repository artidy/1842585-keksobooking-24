const AUTHOR_COUNT = 10;
const BUILDING_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];
const TITLES_VALUE = {
  palace: 'Усадьба Салтыковых-Чертковых',
  flat: 'Сдаётся однокомнатная квартира на долгосрочную аренду',
  house: 'Гостевой домик в черте города',
  bungalow: 'Бунгало от 1 до 6 людей',
  hotel: 'Altyn Eco Park',
};
const DESCRIPTIONS_VALUE = {
  palace: 'Историческая усадьба 18 века в самом центре Москвы замечательно подходит для проведения различных мероприятий. Усадьба Салтыковых – готовая декорация для воплощения любой, даже самой смелой идеи на Вашем торжестве.',
  flat: 'Срочно! Сдаётся 1-комнатная квартира на длительный срок. Теплая, чистая., уютная.',
  house: 'Дом для отпуска «Гостевой домик в черте города»',
  bungalow: 'Шале на воде, с фехтование, уникальные для собак.',
  hotel: 'Отель Altyn Eco Park с общим лаунджем, бесплатной частной парковкой и бесплатным Wi-Fi на всей территории расположен в городе Нур-Султан, примерно в 1,9 км от монумента «Байтерек»',
};
const LATITUDE_RANGE = [0, 90, 5];
const LONGITUDE_RANGE = [0, 180, 5];
const PRICE_RANGE = [100000, 600000];
const ROOMS_RANGE = [1, 30];
const GUESTS_COUNT = [1, 10];
const CHECKIN_VALUES = ['12:00', '13:00', '14:00'];
const CHECKOUT_VALUES = ['12:00', '13:00', '14:00'];
const FUTURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const PHOTOS_PATH = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

/**
 * Вспомогательная функция для вычисления случайного числа в диапазоне.
 * Не надо пользоваться этой функцией напрямую.
 *
 * @param number min - нижняя граница диапазона.
 * @param number max - верхняя граница диапазона.
 * @return number - случайное число из диапазона min <-> max
 */
const getRandomNumber = (min, max) => Math.random() * (max - min) + min;

/**
 * Генерирует случайное число в переданном диапазоне включительно.
 * Если минимальное значение диапазона меньше максимального они поменяются местами.
 *
 * Примеры:
 * 1) generateRandomNumber(1, 1, 7);
 * result = 1.0000000
 *
 * 2) generateRandomNumber(3, 1);
 * result = 2
 *
 * @param number min - нижняя граница диапазона.
 * @param number max - верхняя граница диапазона.
 * @param number decimals - количество чисел после запятой
 * @return number - случайное число из диапазона min <-> max
 */
const generateRandomNumber = (min = 0, max = 0, decimals = 0) => {
  if (min < 0 ||
    max < 0 ||
    decimals < 0) {
    throw new Error('Значения не могут быть меньше 0');
  }

  const random = max > min ? getRandomNumber(min, max) : getRandomNumber(max, min);

  return random.toFixed(decimals);
};

const getAvatarNumber = (userNumber) => userNumber < 10 ? `0${userNumber}` : userNumber.toString();

const getRandomValueFromArray = (values) => values[generateRandomNumber(0, values.length - 1)];

const getRandomLocation = () => ({lat: generateRandomNumber(...LATITUDE_RANGE), lng: generateRandomNumber(...LONGITUDE_RANGE)});

const getSomeValuesFromArray = (values) => {
  const valuesCount = generateRandomNumber(1, values.length);
  const result = [];
  let currentIndex = 0;

  while(currentIndex < valuesCount) {
    const newValue = getRandomValueFromArray(values);
    if (!result.includes(newValue)) {
      result.push(newValue);
      currentIndex += 1;
    }
  }
  return result;
};

const createAdvertisement = (userNumber) => {
  const location = getRandomLocation();
  const buildingType = getRandomValueFromArray(BUILDING_TYPES);
  return {
    author: {
      avatar: `img/avatars/user${getAvatarNumber(userNumber)}.png`,
    },
    offer: {
      title: TITLES_VALUE[buildingType],
      address: `${location.lat}, ${location.lng}`,
      price: generateRandomNumber(...PRICE_RANGE),
      type: buildingType,
      rooms: generateRandomNumber(...ROOMS_RANGE),
      guests: generateRandomNumber(...GUESTS_COUNT),
      checkin: getRandomValueFromArray(CHECKIN_VALUES),
      checkout: getRandomValueFromArray(CHECKOUT_VALUES),
      features: getSomeValuesFromArray(FUTURES),
      description: DESCRIPTIONS_VALUE[buildingType],
      photos: getSomeValuesFromArray(PHOTOS_PATH),
    },
    location,
  };
};

const generateAdvertisements = () => {
  const advertisements = [];
  for (let authorIndex = 1; authorIndex <= AUTHOR_COUNT; authorIndex++) {
    advertisements.push(createAdvertisement(authorIndex));
  }
  return advertisements;
};

generateAdvertisements();
