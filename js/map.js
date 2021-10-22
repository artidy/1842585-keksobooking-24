import generateAdvertisements from './data.js';
import {activateForm, deactivateForm, formAdd, formAddChildren, formFilter, formFilterChildren} from './form.js';
import {createPopup} from './popup.js';

deactivateForm(formFilter, formFilterChildren);
deactivateForm(formAdd, formAddChildren);

const ZOOM = 15;
const ICON_WIDTH = 26;
const ICON_HEIGHT = 52;
const DEVIDER = 2;
const OFFER_COUNT = 10;
const START_LOCATION = {lat: 35.68500, lng: 139.75140};
const TILE_MAP = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const FIXED_VALUE = 5;
const offers = generateAdvertisements(OFFER_COUNT);
const locationField = formAdd.querySelector('#address');
const popupTemplate = document.querySelector('#card').content;
const popupClass = '.popup';
const map = L.map('map-canvas');
L.tileLayer(TILE_MAP,{attribution: ATTRIBUTION}).addTo(map);
const mainIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [ICON_WIDTH, ICON_HEIGHT],
  iconAnchor: [ICON_WIDTH / DEVIDER, ICON_HEIGHT],
});
const offerIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [ICON_WIDTH, ICON_HEIGHT],
  iconAnchor: [ICON_WIDTH / DEVIDER, ICON_HEIGHT],
});
const mainMarker = L.marker(START_LOCATION, {icon: mainIcon, draggable: true});

const setLocation = (target) => {
  const buildingLocation = target.getLatLng();
  locationField.value = `${buildingLocation.lat.toFixed(FIXED_VALUE)}, ${buildingLocation.lat.toFixed(FIXED_VALUE)}`;
};

const onMapLoad = () => {
  activateForm(formFilter, formFilterChildren);
  activateForm(formAdd, formAddChildren);
};
const onMarkerMoveend = (evt) => setLocation(evt.target);

map.on('load', onMapLoad);
mainMarker.on('moveend', onMarkerMoveend);

mainMarker.addTo(map);

offers.forEach((offer) => {
  L.marker(offer.location, {
    icon: offerIcon,
    iconSize: [ICON_WIDTH, ICON_HEIGHT],
    iconAnchor: [ICON_WIDTH / DEVIDER, ICON_HEIGHT],
  }).addTo(map).bindPopup(createPopup(offer, popupTemplate, popupClass));
});

map.setView(START_LOCATION, ZOOM);

setLocation(mainMarker);
