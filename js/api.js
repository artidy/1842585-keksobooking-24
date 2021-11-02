import {sendError} from './notification.js';

/**
 * Адрес сервера для отправки и получения данных
 * @constant
 * @type {string}
 * */
const SERVER_URL = 'https://24.javascript.pages.academy/keksobooking';

/**
 * Каталог для получения предложений с сервера
 * @constant
 * @type {string}
 * */
const DATA_PATH = 'data';

/**
 * Функция для получения предложений с сервера
 * @param {function} onStartLoad - функция для деактивации форм
 * @param {function} onSuccess - функция обработки данных после успешного получения с сервера
 * @param {function} onUpdateMap - обновление данных карты
 * @param {function} onResetMap - сброс фильтров на карте и положения основной метки
 * @return {undefined} - функция ничего не возвращает
 */
const getData = (onStartLoad, onSuccess, onUpdateMap, onResetMap) => () => {
  onStartLoad();
  fetch(`${SERVER_URL}/${DATA_PATH}`)
    .then((response) => response.json())
    .then((data) => onSuccess(data, onUpdateMap))
    .then(onResetMap)
    .catch(({message}) => sendError(message));
};

/**
 * Функция для отправки нового предложения на сервер
 * @param {function} onSuccess - функция обработки данных после отправки на сервер
 * @param {FormData} body - данные для отправки
 * @param {function} onUpdateData - функция на получения новых данных и обновления карты
 * @return {undefined} - функция ничего не возвращает
 */
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
    .then(onUpdateData)
    .catch(({message}) => sendError(message));
};

export {getData, postData};
