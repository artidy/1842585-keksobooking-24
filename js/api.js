import {error} from './notification.js';

const SERVER_URL = 'https://24.javascript.pages.academy/keksobooking';
const DATA_PATH = 'data';

const getData = (onStartLoad, onSuccess, onUpdateMap, onResetMap) => () => {
  onStartLoad();
  fetch(`${SERVER_URL}/${DATA_PATH}`)
    .then((response) => response.json())
    .then((data) => onSuccess(data, onUpdateMap))
    .then(onResetMap)
    .catch(({message}) => error(message));
};

const postData = (onSuccess, body, onUpdateData) => {
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
    .then(() => onUpdateData())
    .catch(({message}) => error(message));
};

export {getData, postData};
