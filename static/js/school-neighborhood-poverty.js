document.addEventListener("DOMContentLoaded", function() {
  let myMap = L.map("schoolMap", {
    center: [43, -75.5], // Approximate center of the USA
    zoom: 7 // Zoom level to fit the entire USA
  });

  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);

  let url = "https://data-nces.opendata.arcgis.com/datasets/nces::school-neighborhood-poverty-estimates-current.geojson";

  d3.json(url).then(function(response) {
    console.log(response);

    features = response.features;

    for (let i = 61000; i < 62000; i++) {
      let location = features[i].geometry;
      if (location) {
        L.marker([location.coordinates[1], location.coordinates[0]]).addTo(myMap);
      }
    }
  });
});
