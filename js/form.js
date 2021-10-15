/**
 * Возвращает подчиненные элементы на форме по селекторам
 * @param {HTMLElement} form - форма родитель
 * @param {array<string>} selectors - селекторы для поиска элементов
 * @return {array<HTMLElement>} - массив подчиненных элементов
 */
const findChildren = (form, selectors) => {
  let result = [];
  selectors.forEach((selector) => {
    result = [...result, ...form.querySelectorAll(selector)];
  });

  return result;
};

/**
 * Активирует форму и все подчиненные элементы
 * @param {HTMLElement} form - форма родитель
 * @param {string} disableClass - класс отключения формы
 * @param {array<HTMLElement>} formElements - массив подчиненных элементов
 * @return {undefined} - функция ничего не возвращает
 */
const activateForm = (form, disableClass, formElements) => {
  form.classList.remove(disableClass);
  formElements.forEach((formElement) => {
    formElement.removeAttribute('disabled');
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
  formElements.forEach((formElement) => {
    formElement.setAttribute('disabled', 'disabled');
  });
};

export {activateForm, deactivateForm, findChildren};
