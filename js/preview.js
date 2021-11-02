import {searchNode} from './utils.js';

/**
 * Начальные настройки изображения
 * @enum {string}
 * */
const PreviewSettings = {
  SIZE: '70',
  CONTAINER_CLASS: 'ad-form__photo',
  DEFAULT_AVATAR: 'img/muffin-grey.svg',
};

const avatarInput = searchNode(document, '#avatar');
const avatarPreview = searchNode(document, '.ad-form-header__preview>img');
const buildingInput = searchNode(document, '#images');
const buildingContainer = searchNode(document, '.ad-form__photo-container');

/**
 * Очищает превью изображений жилья
 * @return {undefined} - функция ничего не возвращает
 */
const clearImages = () => {
  const containers = document.querySelectorAll(`.${PreviewSettings.CONTAINER_CLASS}`);

  containers.forEach((container) => {
    container.remove();
  });
};

/**
 * Создает пустой контейнер для превью жилья
 * @return {undefined} - функция ничего не возвращает
 */
const createContainer = () => {
  const block = document.createElement('div');

  block.classList.add(PreviewSettings.CONTAINER_CLASS);

  return block;
};

/**
 * Добавляет превью выбранного изображения на сайт
 * @param {file} preview - файл изображения для генерации ссылки
 * @return {undefined} - функция ничего не возвращает
 */
const addPicture = (preview) => {
  const container = createContainer();
  const img = document.createElement('img');

  img.setAttribute('src', URL.createObjectURL(preview));
  img.setAttribute('width', PreviewSettings.SIZE);
  img.setAttribute('height', PreviewSettings.SIZE);

  container.append(img);
  buildingContainer.append(container);
};

/**
 * Устанавливает настройки по умолчанию для всех превью на форме
 * @return {undefined} - функция ничего не возвращает
 */
const resetPreviews = () => {
  avatarPreview.src = PreviewSettings.DEFAULT_AVATAR;
  clearImages();
  buildingContainer.append(createContainer());
};

const onAvatarChange = () => {
  const [file] = avatarInput.files;

  if (file) {
    avatarPreview.src = URL.createObjectURL(file);
  }
};

const onImagesChange = () => {
  const previews = Array.from(buildingInput.files);

  clearImages();

  previews.forEach((preview) => {
    addPicture(preview);
  });
};

const initPreview = () => {
  avatarInput.addEventListener('change', onAvatarChange);
  buildingInput.addEventListener('change', onImagesChange);
};

export {initPreview, resetPreviews};
