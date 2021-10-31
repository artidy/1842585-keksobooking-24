import {searchNode} from './utils.js';

const NOTIFICATION_TIME = 5000;
const DOCUMENT_EVENTS = {
  keydown: null,
  click: null,
};

const successTemplate = searchNode(searchNode(document,'#success').content, '.success');
const errorTemplate = searchNode(searchNode(document,'#error').content, '.error');

const removeMessage = (notification) => {
  notification.remove();

  const events = Object.keys(DOCUMENT_EVENTS);

  events.forEach((eventName) => {
    const bindEvent = DOCUMENT_EVENTS[eventName];

    if (bindEvent) {
      document.removeEventListener(eventName, bindEvent);
      DOCUMENT_EVENTS[eventName] = null;
    }
  });
};

const onEscKeydown = (notification) => {
  const onKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      removeMessage(notification);
    }
  };

  DOCUMENT_EVENTS['keydown'] = onKeyDown;

  return onKeyDown;
};

const onDocumentClick = (notification) => {
  const onClick = () => {
    removeMessage(notification);
  };

  DOCUMENT_EVENTS['click'] = onClick;

  return onClick;
};

const addMessage = (template, messageClass, message) => {
  const block = template.cloneNode(true);
  const content = searchNode(block, messageClass);
  const button = searchNode(block, '[type="button"]');

  content.textContent = message;

  document.body.append(block);
  document.addEventListener('keydown', onEscKeydown(block));
  document.addEventListener('click', onDocumentClick(block));

  if (button) {
    button.addEventListener('click', () => removeMessage(block));
  }

  setTimeout(() => {
    removeMessage(block);
  }, NOTIFICATION_TIME);
};

const success = (message) => {
  addMessage(successTemplate, '.success__message', message);
};

const error = (message) => {
  addMessage(errorTemplate, '.error__message', message);
};

export {success, error};
