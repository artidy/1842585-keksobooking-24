import {searchNode} from './utils.js';

const PreviewSettings = {
  SIZE: '70',
  CONTAINER_CLASS: 'ad-form__photo',
};

const avatarInput = searchNode(document, '#avatar');
const avatarPreview = searchNode(document, '.ad-form-header__preview>img');
const buildingInput = searchNode(document, '#images');
const buildingContainer = searchNode(document, '.ad-form__photo-container');

const addContainer = (preview) => {
  const container = document.createElement('div');
  const img = document.createElement('img');

  container.classList.add(PreviewSettings.CONTAINER_CLASS);

  img.setAttribute('src', URL.createObjectURL(preview));
  img.setAttribute('width', PreviewSettings.SIZE);
  img.setAttribute('height', PreviewSettings.SIZE);

  container.append(img);
  buildingContainer.append(container);
};

const onAvatarChange = () => {
  const [file] = avatarInput.files;

  if (file) {
    avatarPreview.src = URL.createObjectURL(file);
  }
};

const onImagesChange = () => {
  const previews = Array.from(buildingInput.files);
  const containers = document.querySelectorAll(`.${PreviewSettings.CONTAINER_CLASS}`);

  containers.forEach((container) => {
    container.remove();
  });

  previews.forEach((preview) => {
    addContainer(preview);
  });
};

const initPreview = () => {
  avatarInput.addEventListener('change', onAvatarChange);
  buildingInput.addEventListener('change', onImagesChange);
};

export {initPreview};
