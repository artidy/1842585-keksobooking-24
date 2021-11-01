import {searchNode, debounce} from './utils.js';

const PriceRange = {
  LOW: 10000,
  MIDDLE: 50000,
};
const OffersCount = {
  MIN: 0,
  MAX: 10,
};
const FEATURE_WEIGHT = 1;

const mapFilters = searchNode(document, '.map__filters');
const housingType = searchNode(mapFilters, '#housing-type');
const housingPrice = searchNode(mapFilters, '#housing-price');
const housingRooms = searchNode(mapFilters, '#housing-rooms');
const housingGuests = searchNode(mapFilters, '#housing-guests');
const featureContainer = searchNode(mapFilters, '#housing-features');

const filterHousing = ({type}) => type === housingType.value || housingType.value === 'any';

const filterPrice = ({price}) => {
  switch(housingPrice.value) {
    case 'low':
      return price < PriceRange.LOW;
    case 'middle':
      return price >= PriceRange.LOW && price < PriceRange.MIDDLE;
    case 'high':
      return price >= PriceRange.MIDDLE;
    default:
      return true;
  }
};

const filterRooms = ({rooms}) => rooms >= +housingRooms.value || housingRooms.value === 'any';

const filterGuests = ({guests}) => guests >= +housingGuests.value || housingGuests.value === 'any';

const getWeightFeatures = (features) => {
  let weight = 0;

  if (!features) {
    return weight;
  }

  const nodes = Array.from(featureContainer.querySelectorAll('[type="checkbox"]:checked'));
  weight = nodes.reduce((value, node) => (features.includes(node.value) ? value + FEATURE_WEIGHT : value), weight);

  return weight;
};

const sortFeature = ({features: firstFeatures}, {features: secondFeatures}) => getWeightFeatures(secondFeatures) - getWeightFeatures(firstFeatures);

const updateFilters = (offers, updateMap) => {
  const filteredOffers = offers
    .slice()
    .filter(({offer}) => filterHousing(offer) && filterPrice(offer) && filterRooms(offer) && filterGuests(offer))
    .sort(({offer: firstOffer}, {offer: secondOffer}) => sortFeature(firstOffer, secondOffer))
    .slice(OffersCount.MIN, OffersCount.MAX);

  updateMap(filteredOffers);
};

const onDebounce = debounce((offers, updateMap) => updateFilters(offers, updateMap));

const onFilterOffers = (offers, updateMap) => {
  const onUpdateFilters = () => onDebounce(offers, updateMap);
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
