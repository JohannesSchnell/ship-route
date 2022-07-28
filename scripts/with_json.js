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

const ms52n = L.geoJSON(jsonData);
function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}

function just_every(n, data) {
  let arr = [];
  for (i = 0; i < data.length; i++) {
    if (i % n == 0) {
      arr.push(data[i]);
    }
  }
  return arr;
}

function iterateOverJSON(features) {
  let points = [];
  for (let i = 0; i < features.length; i++) {
    feature = features[i];
    points.push(
      L.latLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0])
    );
  }
  return points;
}

function addShip(n, features) {
  let points = iterateOverJSON(features);
  points_20 = just_every(n, points);

  console.log(points_20);
  //var c = [];
  for (i = 0; i < points_20.length; i++) {
    //c.push([points_20[i]["lat"], points_20[i]["lng"]]);
    //console.log(c);
    let marker = L.marker(points_20[i], {
      icon: shipIcon,
    });
    marker.addTo(map).on("click", function (e) {
      map.setView(e.latlng, 13);
    });
    //c = [];
  }
}

function createLine(features) {
  let points = iterateOverJSON(features);

  //console.log(points);
  route = L.polyline(points, {
    color: "red",
    weight: 3,
    opacity: 0.5,
    smoothFactor: 1,
  });
  route.addTo(map).on("click", zoomToFeature);
}

createLine(jsonData.features);
addShip(20, jsonData.features);
