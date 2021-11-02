import {searchNode} from './utils.js';

/**
 * Пауза в миллисекундах до удаления уведомления
 * @constant
 * @type {number}
 * */
const NOTIFICATION_TIME = 5000;

const successTemplate = searchNode(searchNode(document,'#success').content, '.success');
const errorTemplate = searchNode(searchNode(document,'#error').content, '.error');

/**
 * Функция для создания нового уведомления для пользователя
 * @param {Node} template - шаблон уведомления
 * @param {string} messageClass - класс элемента для уведомления
 * @param {string} message - текст уведомления
 * @return {undefined} - функция ничего не возвращает
 */
const addMessage = (template, messageClass, message) => {
  const block = template.cloneNode(true);
  const content = searchNode(block, messageClass);

  const onEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      document.removeEventListener('keydown', onEscKeydown);
      block.remove();
    }
  };

  const removeEvent = () => {
    document.removeEventListener('keydown', onEscKeydown);
  };

  const onBlockClick = () => {
    removeEvent();
    block.remove();
  };

  content.textContent = message;

  document.body.append(block);

  document.addEventListener('keydown', onEscKeydown);
  block.addEventListener('click', onBlockClick);

  setTimeout(() => {
    removeEvent();
    block.remove();
  }, NOTIFICATION_TIME);
};

/**
 * Функция для создания нового уведомления об успешном выполнении действия
 * @param {string} message - текст уведомления
 * @return {undefined} - функция ничего не возвращает
 */
const sendSuccess = (message) => {
  addMessage(successTemplate, '.success__message', message);
};

/**
 * Функция для создания нового уведомления об ошибке
 * @param {string} message - текст уведомления
 * @return {undefined} - функция ничего не возвращает
 */
const sendError = (message) => {
  addMessage(errorTemplate, '.error__message', message);
};

export {sendSuccess, sendError};
