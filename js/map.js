import {createPopup} from './popup.js';

const MapSettings = {
  ID: 'map-canvas',
  ZOOM: 15,
  MAIN_ICON_WIDTH: 52,
  MAIN_ICON_HEIGHT: 52,
  OFFER_ICON_WIDTH: 40,
  OFFER_ICON_HEIGHT: 40,
  DEVIDER: 2,
  START_LOCATION: {lat: 35.68500, lng: 139.75140},
  TILE_MAP: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  ATTRIBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  MAIN_ICON_URL: 'img/main-pin.svg',
  OFFER_ICON_URL: 'img/pin.svg',
  POPUP_CLASS: '.popup',
};

const getIconSettings = (iconUrl, iconWidth, iconHeight) => ({
  iconUrl: iconUrl,
  iconSize: [iconWidth, iconHeight],
  iconAnchor: [iconWidth / MapSettings.DEVIDER, iconHeight],
});

const popupTemplate = document.querySelector('#card').content;
const mainIcon = L.icon(getIconSettings(MapSettings.MAIN_ICON_URL, MapSettings.MAIN_ICON_WIDTH, MapSettings.MAIN_ICON_HEIGHT));
const offerIcon = L.icon(getIconSettings(MapSettings.OFFER_ICON_URL, MapSettings.OFFER_ICON_WIDTH, MapSettings.OFFER_ICON_HEIGHT));
const mainMarker = L.marker(MapSettings.START_LOCATION, {icon: mainIcon, draggable: true});
const tileLayer = L.tileLayer(MapSettings.TILE_MAP,{attribution: MapSettings.ATTRIBUTION});
const layerMarkerGroup = L.layerGroup();
const map = L.map(MapSettings.ID);

mainMarker.addTo(map);
tileLayer.addTo(map);
layerMarkerGroup.addTo(map);

const addOffersToMap = (offers) => {
  layerMarkerGroup.clearLayers();

  offers.forEach((offer) =>
    L.marker(offer.location, {icon: offerIcon})
      .addTo(layerMarkerGroup)
      .bindPopup(createPopup(offer, popupTemplate, MapSettings.POPUP_CLASS)),
  );
};

const getCurrentLocation = () => mainMarker.getLatLng();

const resetMap = () => {
  map.setView(MapSettings.START_LOCATION, MapSettings.ZOOM);
  mainMarker.setLatLng(MapSettings.START_LOCATION);
};

const onMarkerMoveEnd = (setLocation) => mainMarker.on('move', () => setLocation(getCurrentLocation()));

const initMap = (onMapLoad) => () => {
  resetMap();
  onMapLoad();
};

export {initMap, getCurrentLocation, addOffersToMap, onMarkerMoveEnd};
