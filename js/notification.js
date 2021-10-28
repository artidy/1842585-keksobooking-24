import {searchNode} from './utils.js';

const body = searchNode(document, 'body');
const successTemplate = searchNode(searchNode(document,'#success').content, '.success');
const errorTemplate = searchNode(searchNode(document,'#error').content, '.error');

const addMessage = (template, messageClass, message) => {
  const block = template.cloneNode(true);
  const content = searchNode(block, messageClass);

  content.textContent = message;

  body.append(block);

  setTimeout(() => {
    block.remove();
  }, 5000);
};

const success = (message) => {
  addMessage(successTemplate, '.success__message', message);
};

const error = (message) => {
  addMessage(errorTemplate, '.error__message', message);
};

export {success, error};
