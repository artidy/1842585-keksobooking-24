import {searchNode} from './utils.js';

const NOTIFICATION_TIME = 5000;

const successTemplate = searchNode(searchNode(document,'#success').content, '.success');
const errorTemplate = searchNode(searchNode(document,'#error').content, '.error');

const addMessage = (template, messageClass, message) => {
  const block = template.cloneNode(true);
  const content = searchNode(block, messageClass);

  content.textContent = message;

  document.body.append(block);

  setTimeout(() => {
    block.remove();
  }, NOTIFICATION_TIME);
};

const success = (message) => {
  addMessage(successTemplate, '.success__message', message);
};

const error = (message) => {
  addMessage(errorTemplate, '.error__message', message);
};

export {success, error};
