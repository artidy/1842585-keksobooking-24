import generateAdvertisements from './data.js';
import {activateForm, deactivateForm, formAdd, formAddChildren, formFilter, formFilterChildren} from './form.js';
import {createPopup} from './popup.js';

const MapSettings = {
  ID: 'map-canvas',
  ZOOM: 15,
  ICON_WIDTH: 26,
  ICON_HEIGHT: 52,
  DEVIDER: 2,
  START_LOCATION: {lat: 35.68500, lng: 139.75140},
  TILE_MAP: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  ATTRIBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  MAIN_ICON: 'img/main-pin.svg',
  OFFER_ICON: 'img/pin.svg',
  POPUP_CLASS: '.popup',
};

const OFFER_COUNT = 10;
const FIXED_VALUE = 5;

deactivateForm(formFilter, formFilterChildren);
deactivateForm(formAdd, formAddChildren);

const offers = generateAdvertisements(OFFER_COUNT);

const locationField = formAdd.querySelector('#address');
const popupTemplate = document.querySelector('#card').content;

const map = L.map(MapSettings.ID);

L.tileLayer(MapSettings.TILE_MAP,{attribution: MapSettings.ATTRIBUTION}).addTo(map);

const getIconSettings = (url) => ({
  iconUrl: url,
  iconSize: [MapSettings.ICON_WIDTH, MapSettings.ICON_HEIGHT],
  iconAnchor: [MapSettings.ICON_WIDTH / MapSettings.DEVIDER, MapSettings.ICON_HEIGHT],
});

const mainIcon = L.icon(getIconSettings(MapSettings.MAIN_ICON));
const offerIcon = L.icon(getIconSettings(MapSettings.OFFER_ICON));
const mainMarker = L.marker(MapSettings.START_LOCATION, {icon: mainIcon, draggable: true});

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
  L.marker(offer.location, {icon: offerIcon})
    .addTo(map)
    .bindPopup(createPopup(offer, popupTemplate, MapSettings.POPUP_CLASS));
});

map.setView(MapSettings.START_LOCATION, MapSettings.ZOOM);

setLocation(mainMarker);
