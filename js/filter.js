import {searchNode, debounce} from './utils.js';

/**
 * Ограничение для фильтра аренды жилья
 * @enum {number}
 * */
const PriceRange = {
  LOW: 10000,
  MIDDLE: 50000,
};

/**
 * Значения фильтра стоимости аренды жилья
 * @enum {string}
 * */
const PriceType = {
  LOW: 'low',
  MIDDLE: 'middle',
  HIGH: 'high',
};

/**
 * Ограничение количества предложений для вывода на карту
 * @enum {number}
 * */
const OffersCount = {
  MIN: 0,
  MAX: 10,
};

/**
 * Вес удобства, если оно совпало с фильтром
 * @constant
 * @type {number}
 * */
const FEATURE_WEIGHT = 1;

const mapFilters = searchNode(document, '.map__filters');
const housingType = searchNode(mapFilters, '#housing-type');
const housingPrice = searchNode(mapFilters, '#housing-price');
const housingRooms = searchNode(mapFilters, '#housing-rooms');
const housingGuests = searchNode(mapFilters, '#housing-guests');
const featureContainer = searchNode(mapFilters, '#housing-features');

/**
 * Функция проверяет соответствие предложения по типу жилья
 * @param {string} type - тип жилья
 * @return {boolean} - результат проверки условия
 */
const filterHousing = ({type}) => type === housingType.value || housingType.value === 'any';

/**
 * Функция проверяет соответствие предложения по стоимости
 * @param {number} price - стоимость аренды
 * @return {boolean} - результат проверки условия
 */
const filterPrice = ({price}) => {
  switch(housingPrice.value) {
    case PriceType.LOW:
      return price < PriceRange.LOW;
    case PriceType.MIDDLE:
      return price >= PriceRange.LOW && price < PriceRange.MIDDLE;
    case PriceType.HIGH:
      return price >= PriceRange.MIDDLE;
    default:
      return true;
  }
};

/**
 * Функция проверяет соответствие предложения по количеству комнат
 * @param {number} rooms - количество комнат
 * @return {boolean} - результат проверки условия
 */
const filterRooms = ({rooms}) => rooms >= +housingRooms.value || housingRooms.value === 'any';

/**
 * Функция проверяет соответствие предложения по количеству гостей
 * @param {number} guests - количество гостей
 * @return {boolean} - результат проверки условия
 */
const filterGuests = ({guests}) => guests >= +housingGuests.value || housingGuests.value === 'any';

/**
 * Функция проверяет соответствие предложения по удобствам
 * @param {array|null} features - массив удобств в предложении
 * @return {any} - вес соответствия предложения
 */
const getWeightFeatures = (features) => {
  const weight = 0;

  if (!features) {
    return weight;
  }

  const nodes = Array.from(featureContainer.querySelectorAll('[type="checkbox"]:checked'));

  return nodes.reduce((value, node) => (features.includes(node.value) ? value + FEATURE_WEIGHT : value), weight);
};

/**
 * Функция сортирует предложения по удобствам
 * @param {array|null} firstFeatures - массив удобств в предложении
 * @param {array|null} secondFeatures - массив удобств в предложении
 * @return {number} - результат сортировки предложений
 */
const sortFeature = ({features: firstFeatures}, {features: secondFeatures}) => getWeightFeatures(secondFeatures) - getWeightFeatures(firstFeatures);

/**
 * Функция проводит фильтр и сортировку предложений полученных с сервера и выводит максимальное значение предложений, установленных в константе OffersCount
 * @param {array<object>} offers - массив предложений, полученных с сервера
 * @param {function} updateMap - обновление фильтров на карте
 * @return {undefined} - функция ничего не возвращает
 */
const updateFilters = (offers, updateMap) => {
  const filteredOffers = offers
    .slice()
    .filter(({offer}) => filterHousing(offer) && filterPrice(offer) && filterRooms(offer) && filterGuests(offer))
    .sort(({offer: firstOffer}, {offer: secondOffer}) => sortFeature(firstOffer, secondOffer))
    .slice(OffersCount.MIN, OffersCount.MAX);

  updateMap(filteredOffers);
};

const onDebounceRenderMap = debounce((offers, updateMap) => updateFilters(offers, updateMap));

const onFilterOffers = (offers, updateMap) => {
  const onUpdateFilters = () => onDebounceRenderMap(offers, updateMap);

  const onUpdateFeature = ({target}) => {
    if (target && target.classList.contains('map__feature')) {
      onUpdateFilters()();
    }
  };

  mapFilters.addEventListener('change', onUpdateFilters);
  featureContainer.addEventListener('click', onUpdateFeature);

  updateFilters(offers, updateMap);
};

export {onFilterOffers};
