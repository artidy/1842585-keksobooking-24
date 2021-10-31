import {getData, postData} from './api.js';
import {activateForms, setLocation, initForm, deactivateForms} from './form.js';
import {addOffersToMap, getCurrentLocation, initMap, onMarkerMoveEnd} from './map.js';
import {onFilterOffers} from './filter.js';
import {initPreview} from './preview.js';

const updatePage = getData(deactivateForms, onFilterOffers, addOffersToMap, initMap(activateForms));

onMarkerMoveEnd(setLocation);
initForm(postData, getCurrentLocation, updatePage);
initPreview();
updatePage();
