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

generateRandomNumber(1, 1, 7);
