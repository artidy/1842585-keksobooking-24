/**
 * Возвращает подчиненные элементы на форме по селекторам
 * @param {HTMLElement} form - форма родитель
 * @param {array<string>} selectors - селекторы для поиска элементов
 * @return {array<HTMLElement>} - массив подчиненных элементов
 */
const findChildren = (form, selectors) => selectors.map((selector) => form.querySelectorAll(selector));

/**
 * Активирует форму и все подчиненные элементы
 * @param {HTMLElement} form - форма родитель
 * @param {string} disableClass - класс отключения формы
 * @param {array<HTMLElement>} formElements - массив подчиненных элементов
 * @return {undefined} - функция ничего не возвращает
 */
const activateForm = (form, disableClass, formElements) => {
  form.classList.remove(disableClass);
  formElements.forEach((fieldset) => {
    fieldset.disabled = false;
  });
};

/**
 * Отключает форму и все подчиненные элементы
 * @param {HTMLElement} form - форма родитель
 * @param {string} disableClass - класс отключения формы
 * @param {array<HTMLElement>} formElements - массив подчиненных элементов
 * @return {undefined} - функция ничего не возвращает
 */
const deactivateForm = (form, disableClass, formElements) => {
  form.classList.add(disableClass);
  formElements.forEach((fieldset) => {
    fieldset.disabled = true;
  });
};

export {activateForm, deactivateForm, findChildren};
