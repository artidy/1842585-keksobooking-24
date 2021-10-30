/**
 * Подчиненные элементы, которые необходимо обработать
 * @constant
 * @type {array<string>}
 * */
const CONTROL_SELECTORS = ['select', 'fieldset'];

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

export {searchNode, findChildren};
