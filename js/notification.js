import {searchNode} from './utils.js';

const NOTIFICATION_TIME = 5000;

const successTemplate = searchNode(searchNode(document,'#success').content, '.success');
const errorTemplate = searchNode(searchNode(document,'#error').content, '.error');

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

const success = (message) => {
  addMessage(successTemplate, '.success__message', message);
};

const error = (message) => {
  addMessage(errorTemplate, '.error__message', message);
};

export {success, error};
