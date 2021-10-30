import {error} from './notification.js';

const SERVER_URL = 'https://24.javascript.pages.academy/keksobooking';
const DATA_PATH = 'data';

const getData = (onSuccess) => {
  fetch(`${SERVER_URL}/${DATA_PATH}`)
    .then((response) => response.json())
    .then((data) => onSuccess(data))
    .catch((err) => error(err.message));
};

const postData = (onSuccess, body, onFinally) => {
  fetch(SERVER_URL, {
    method: 'POST',
    body,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`Не удалось отправить данные, статус ошибки: ${response.status}, код ошибки: ${response.statusText}`);
    })
    .then((data) => onSuccess(data))
    .catch((err) => error(err.message))
    .finally(() => onFinally());
};

export {getData, postData};
