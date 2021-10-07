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

export {generateRandomNumber, getAvatarNumber, getRandomValueFromArray, getRandomLocation, getSomeValuesFromArray};
