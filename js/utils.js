import {IMG_PATH} from './constants.js';

/**
 * Вспомогательная функция для вычисления случайного числа в диапазоне.
 * Не надо пользоваться этой функцией напрямую.
 * @param {number} min - нижняя граница диапазона.
 * @param {number} max - верхняя граница диапазона.
 * @return {number} - случайное число из диапазона min <-> max
 */
const getRandomNumber = (min, max) => Math.random() * (max - min) + min;

/**
 * Генерирует случайное число в переданном диапазоне включительно.
 * Если минимальное значение диапазона меньше максимального они поменяются местами.
 * @param {number} min - нижняя граница диапазона.
 * @param {number} max - верхняя граница диапазона.
 * @param {number} decimals - количество чисел после запятой
 * @return {number} - случайное число из диапазона min <-> max
 */
const generateRandomNumber = (min = 0, max = 0, decimals = 0) => {
  if (min < 0 ||
    max < 0 ||
    decimals < 0) {
    throw new Error('Значения не могут быть меньше 0');
  }

  const random = max > min ? getRandomNumber(min, max) : getRandomNumber(max, min);

  return +random.toFixed(decimals);
};

/**
 * Обрабатывает идентификатор пользователя и возвращает идентификатор его аватара.
 * @param {number} userNumber - идентификатор пользователя.
 * @param {number} numberLimit - граница чисел до которой необходимо добавить лидирующий 0.
 * @return {string} - идентификатор аватара пользователя
 */
const getAvatarNumber = (userNumber, numberLimit) => userNumber < numberLimit ? `0${userNumber}` : userNumber.toString();

/**
 * Возвращает случайный элемент переданного массива.
 * @param {array} values - массив элементов, элементы могут быть любого типа
 * @return {any} - случайный элемент массива.
 */
const getRandomValueFromArray = (values) => values[generateRandomNumber(0, values.length - 1)];

/**
 * Возвращает объект локации со случайными координатами в переданном диапазоне.
 * @param {object} latitudeRange - диапазон значений длины
 * @param {object} longitudeRange - диапазон значений долготы
 * @return {object} - объект, содержащий случайные значения длины и долготы
 */
const getRandomLocation = (latitudeRange, longitudeRange) => ({
  lat: generateRandomNumber(latitudeRange.MIN, latitudeRange.MAX, latitudeRange.DECIMALS),
  lng: generateRandomNumber(longitudeRange.MIN, longitudeRange.MAX, longitudeRange.DECIMALS),
});

/**
 * Возвращает несколько случайных элементов из переданного массива.
 * @param {array} values - массив элементов, элементы могут быть любого типа
 * @return {array} - массив случайных элементов из переданного массива.
 */
const getSomeValuesFromArray = (values) => {
  const valuesCount = generateRandomNumber(1, values.length);
  const result = [];
  let currentIndex = 0;

  while (currentIndex < valuesCount) {
    const newValue = getRandomValueFromArray(values);
    if (!result.includes(newValue)) {
      result.push(newValue);
      currentIndex += 1;
    }
  }

  return result;
};

/**
 * Ищет дочерний элемент по селектору
 * @param {Node} parent - родительская нода в которой требуется найти элемент
 * @param {string} selector - селектор дочернего элемента
 * @return {HTMLElement} - дочерний элемент
 */
const searchNode = (parent, selector) => parent.querySelector(selector);

/**
 * Заполняет текстовое поле на форме
 * @param {HTMLElement} container - элемент в котором необходимо заполнить текст
 * @param {string} text - текст, который необходимо добавить
 * @return {undefined} - функция ничего не возвращает
 */
const fillTextContent = (container, text) => {
  if (text) {
    container.textContent = text;
  } else {
    container.remove();
  }
};

/**
 * Формирует описание цены в рублях
 * @param {number} price - цена аренды
 * @return {string} - описание цены в формате "50000 ₽/ночь"
 */
const getPriceDescription = (price) => !price ? '' : `${price} ₽/ночь`;

/**
 * Проверяет значение и возвращает слово в подходящей форме
 * @param {array<string>} forms - три формы слова ONE - единственная, TWO - множественная - значение от 2 до 4(включительно) и MANY - множественная(все остальные)
 * @param {number} value - количество предметов
 * @return {string} - слово в единственной или множественной форме
 */
const getDescriptionForm = (forms, value) => {
  const DEV_10 = 10;
  const DEV_100 = 100;
  const RANGE_ONE = 1;
  const RANGE_TWO = 5;
  const RANGE_MANY = {
    MIN: 11,
    MAX: 20,
  };
  const ONE = 0;
  const TWO = 1;
  const MANY = 2;
  const mod10 = value % DEV_10;
  const mod100 = value % DEV_100;

  if (mod100 >= RANGE_MANY.MIN && mod100 <= RANGE_MANY.MAX || mod10 > RANGE_TWO) {
    return forms[MANY];
  } else if (mod10 === RANGE_ONE) {
    return forms[ONE];
  } else if (mod10 > RANGE_ONE && mod10 < RANGE_TWO) {
    return forms[TWO];
  }

  return forms[MANY];
};

/**
 * Формирует описание вместительности помещения
 * @param {number} rooms - количество комнат в помещении
 * @param {number} guests - количество гостей
 * @return {string} - текст в формате "5 комнат для 6 гостей"
 */
const getCapacityDescription = (rooms, guests) => {
  const roomsForm = ['комната', 'комнаты', 'комнат'];
  const guestsForm = ['гостя', 'гостей', 'гостей'];

  return !rooms || !guests ? '' : `${rooms} ${getDescriptionForm(roomsForm, rooms)} для ${guests} ${getDescriptionForm(guestsForm, guests)}`;
};

/**
 * Формирует описание заезда и выезда
 * @param {string} checkIn - время заезда
 * @param {string} checkOut - время выезда
 * @return {string} - текст в формате "Заезд после 12:00, выезд до 13:00"
 */
const getCheckDescription = (checkIn, checkOut) => !checkIn || !checkOut ? '' : `Заезд после ${checkIn}, выезд до ${checkOut}`;

/**
 * Удаляет из шаблона лишние удобства
 * @param {HTMLElement} container - блок со всеми удобствами
 * @param {array<string>} features - список доступных удобств для помещения
 * @return {undefined} - функция ничего не возвращает
 */
const filterFeatures = (container, features) => {
  if (features.length === 0) {
    container.remove();
  }

  const featuresNodes = container.querySelectorAll('.popup__feature');

  featuresNodes.forEach((featureNode) => {
    if (features.find((feature) => featureNode.classList.contains(`popup__feature--${feature}`))) {
      return;
    }
    featureNode.remove();
  });

  if (featuresNodes.length === 0) {
    container.remove();
  }
};

/**
 * Добавляет на форму фотографии помещения
 * @param {HTMLElement} container - блок с фотографиями
 * @param {array<string>} photos - список фотографий помещений
 * @return {undefined} - функция ничего не возвращает
 */
const fillPhotos = (container, photos) => {
  if (photos.length === 0) {
    container.remove();
  }

  const template = container.querySelector('.popup__photo');

  photos.forEach((link) => {
    const photoContainer = template.cloneNode();
    photoContainer.src = `${IMG_PATH}${link}`;
    container.append(photoContainer);
  });

  template.remove();
};

/**
 * Устанавливает аватар автора объявления
 * @param {HTMLElement} container - блок для аватара пользователя
 * @param {string} link - ссылка на аватар автора
 * @return {undefined} - функция ничего не возвращает
 */
const fillAvatar = (container, link) => {
  if (!link) {
    container.remove();
  } else {
    container.src = link;
  }
};

export {
  generateRandomNumber,
  getAvatarNumber,
  getRandomValueFromArray,
  getRandomLocation,
  getSomeValuesFromArray,
  searchNode,
  fillTextContent,
  getPriceDescription,
  getCapacityDescription,
  getCheckDescription,
  filterFeatures,
  fillPhotos,
  fillAvatar
};
