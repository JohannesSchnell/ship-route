//https://stackoverflow.com/questions/59525334/how-to-include-barchart-into-my-leaflet-map

function drawChart() {
  // Our labels along the x-axis
  var years = [1500, 1600, 1700];
  // For drawing the lines
  var africa = [86, 114, 106];
  var ctx = document.getElementById("myChart");
  new window.Chart(ctx, {
    type: "line",
    backgroundColor: ["red", "blue", "purple"],
    data: {
      labels: years,

      datasets: [
        {
          fill: true,
          data: africa,
          borderColor: ["red", "blue", "purple"],
        },
      ],
    },
  });
}

function setupMap() {
  var mymap = window.L.map("mapid").setView([53, 12], 13);
  window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap",
  }).addTo(mymap);

  var icon = window.L.divIcon({
    className: "custom-div-icon",
    html: "<canvas id='myChart'></canvas>",
    iconSize: [120, 120],
    iconAnchor: [15, 42],
  });

  window.L.marker([53, 12], { icon: icon }).addTo(mymap);
}

setupMap();
drawChart();

document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  We use Parcel to bundle this sandbox, you can find more info about Parcel
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>
`;
