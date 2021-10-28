import {getData, postData} from './api.js';
import {activateForms, setLocation, initForm} from './form.js';
import {addOffersToMap, getCurrentLocation, initMap} from './map.js';

getData(addOffersToMap);
initForm(postData, getCurrentLocation);
initMap(activateForms, setLocation);
