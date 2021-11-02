/**
 * Подчиненные элементы, которые необходимо обработать
 * @constant
 * @type {array<string>}
 * */
const CONTROL_SELECTORS = ['select', 'fieldset'];

/**
 * Пауза в миллисекундах до срабатывания переданной функции
 * @constant
 * @type {number}
 * */
const TIMEOUT_DEBOUNCE = 500;

/**
 * Ищет дочерний элемент по селектору
 * @param {Node} parent - родительская нода в которой требуется найти элемент
 * @param {string} selector - селектор дочернего элемента
 * @return {HTMLElement} - дочерний элемент
 */
const searchNode = (parent, selector) => parent.querySelector(selector);

/**
 * Возвращает подчиненные элементы на форме по селекторам
 * @param {HTMLElement} form - форма родитель
 * @return {array<HTMLElement>} - массив подчиненных элементов
 */
const findChildren = (form) => CONTROL_SELECTORS.map((selector) => Array.from(form.querySelectorAll(selector))).flat();

/**
 * Функция взята из интернета и доработана
 * Источник - https://www.freecodecamp.org/news/javascript-debounce-example
 */
const debounce = (callback, timeoutDelay = TIMEOUT_DEBOUNCE) => {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
};

export {searchNode, findChildren, debounce};
