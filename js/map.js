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
  MAIN_ICON_URL: 'img/main-pin.svg',
  OFFER_ICON_URL: 'img/pin.svg',
  POPUP_CLASS: '.popup',
};

const getIconSettings = (iconUrl) => ({
  iconUrl: iconUrl,
  iconSize: [MapSettings.ICON_WIDTH, MapSettings.ICON_HEIGHT],
  iconAnchor: [MapSettings.ICON_WIDTH / MapSettings.DEVIDER, MapSettings.ICON_HEIGHT],
});

const popupTemplate = document.querySelector('#card').content;
const mainIcon = L.icon(getIconSettings(MapSettings.MAIN_ICON_URL));
const offerIcon = L.icon(getIconSettings(MapSettings.OFFER_ICON_URL));
const mainMarker = L.marker(MapSettings.START_LOCATION, {icon: mainIcon, draggable: true});
const tileLayer = L.tileLayer(MapSettings.TILE_MAP,{attribution: MapSettings.ATTRIBUTION});
const map = L.map(MapSettings.ID);

mainMarker.addTo(map);
tileLayer.addTo(map);

const addOffersToMap = (offers) => {
  offers.forEach((offer) => {
    L.marker(offer.location, {icon: offerIcon})
      .addTo(map)
      .bindPopup(createPopup(offer, popupTemplate, MapSettings.POPUP_CLASS));
  });
};

const getCurrentLocation = () => mainMarker.getLatLng();

const initMap = (activateForms, setLocation) => {
  const onMapLoad = () => activateForms();
  const onMarkerMoveEnd = () => setLocation(getCurrentLocation());

  map.on('load', onMapLoad);
  mainMarker.on('moveend', onMarkerMoveEnd);

  map.setView(MapSettings.START_LOCATION, MapSettings.ZOOM);
};

export {initMap, getCurrentLocation, addOffersToMap};
