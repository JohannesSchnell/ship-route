//os map
const map = L.map("myMap").setView([0, 0], 1);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
}).addTo(map);

//const
const ms52n_data = { lat: [], lon: [], time: [], windSpeed: [], windDir: [] };
const ts = { time: [], windSpeed: [], windDir: [] };
const loc = { lat: [], lon: [] };
const shipIcon = L.icon({
  iconUrl: "img/ship.svg",
  iconSize: [32, 32], // size of the icon
  iconAnchor: [16, 16], // point of the icon which will correspond to marker's location
});

console.log(jsonData);

//func
async function getData() {
  const response = await fetch("data/ms_52north.csv");
  const data = await response.text();
  //console.log(data);
  const rows = data.split("\n").slice(1);
  rows.forEach((element) => {
    const val = element.split(",");
    ms52n_data.lat.push(val[5]);
    ms52n_data.lon.push(val[6]);
    ms52n_data.time.push(val[4]);
    ms52n_data.windSpeed.push(val[7]);
    ms52n_data.windDir.push(val[8]);
  });
}

async function draw_layers(ms52n_data) {
  const poly = [];
  for (let i = 0; i < ms52n_data.lat.length; i++) {
    if (i % 20 == 0) {
      const marker = L.marker([ms52n_data.lat[i], ms52n_data.lon[i]], {
        icon: shipIcon,
      })
        .addTo(map)
        .on("click", function (e) {
          map.setView(e.latlng, 13);
        });
    }
    //const poly = [];
    poly.push(new L.LatLng(ms52n_data.lat[i], ms52n_data.lon[i]));
    //console.log(poly);
  }
  const route = new L.Polyline(poly, {
    color: "red",
    weight: 3,
    opacity: 0.5,
    smoothFactor: 1,
  });
  route.addTo(map).on("click", zoomToFeature);
  return route;
}

async function draw_chart(ms52n_data) {
  const labels = ms52n_data.time;
  const arrow = new Image();
  arrow.src = "img/arrow.svg";
  arrow.width = 12;
  arrow.height = 12;
  const dir_line = [];
  var rot_winddir = ms52n_data.windDir.map((x) => x - 90);
  console.log(rot_winddir);
  for (let i = 0; i < ms52n_data.lat.length; i++) {
    dir_line.push(25);
  }
  const data = {
    labels: labels,
    datasets: [
      {
        type: "bar",
        label: "Windspeed m/s",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: ms52n_data.windSpeed,
        //pointStyle: arrow,
        //rotation: ms52n_data.windDir,
      },
      {
        type: "line",
        label: "Winddir °",
        backgroundColor: "rgb(0, 0, 0, 0)",
        borderColor: "rgb(0, 0, 0, 0)",
        data: dir_line,
        pointStyle: arrow,
        rotation: rot_winddir,
      },
    ],
  };

  const config = {
    //type: "radar",
    data: data,
    options: {},
  };
  const myChart = new Chart(document.getElementById("windSpeed"), config);
}

async function draw() {
  await getData();
  ms_route = draw_layers(ms52n_data);
  draw_chart(ms52n_data);
}

//calls
draw();

function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}
