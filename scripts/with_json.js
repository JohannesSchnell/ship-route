//os map
const map = L.map("myMap").setView([0, 0], 1);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
}).addTo(map);

const shipIcon = L.icon({
  iconUrl: "img/ship.svg",
  iconSize: [32, 32], // size of the icon
  iconAnchor: [16, 16], // point of the icon which will correspond to marker's location
});

//const ms52 = new L.GeoJSON(jsonData);

L.GeoJSON(jsonData).addTo(map);
