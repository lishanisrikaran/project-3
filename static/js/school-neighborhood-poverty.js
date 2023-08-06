// Creates the map object so the initial view captures the state: New York.
let myMap = L.map("schoolMap", {
  center: [43, -75.5], 
  zoom: 7 
});


// Adds the tile layer.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


// Loads the GeoJSON data.
let url = "https://data-nces.opendata.arcgis.com/datasets/nces::school-neighborhood-poverty-estimates-current.geojson";


// Creates a layer group which will store the circle markers for each school displayed on myMap. 
let schoolsLayer = L.layerGroup(); 


// Gets the data with d3.
d3.json(url).then(function(response) {
  // Logs the reponse within the console so the properties of each feature can be viewed. 
  console.log(response);

  // Sets up a variable to hold the features array of objects. 
  features = response.features;

  // When the GeoJSON is explored, the majority of New York's schools lay within the 61000th and 62000th object therefore each feature in this range will be looped through.
  for (let i = 61000; i < 62000; i++) {
    // The coordinates of each school in our sample are located within the geometry array of objects which will now be stored in the 'location' variable. 
    let location = features[i].geometry;
    
    // As we are not able to manually check if each of our sample contains a geometry array, we set a conditional to first check this.
    if (location) {
      // Retrieves the income to poverty ratio.
      let iprEst = features[i].properties.IPR_EST;

      // Defines the color based on the value of IPR_EST (lower the poorer).
      let fillColor;
      if (iprEst <= 200) {
        fillColor = "red";
      } else if (iprEst <= 400) {
        fillColor = "orange";
      } else if (iprEst <= 600) {
        fillColor = "yellow";
      } else {
        fillColor = "green";
      }

      // Creates a circle marker where the color is dependant on the value of the IPR_EST.
      let circleMarker = L.circle([location.coordinates[1], location.coordinates[0]], {
        radius: 5000, 
        fillColor: fillColor,
        color: "black", 
        weight: 1,
        fillOpacity: 0.8
      });

      // Adds a popup to the circle marker with the school name and their IPR_EST.
      circleMarker.bindPopup(`School: ${features[i].properties.NAME}<br>Income - Poverty Ratio Estimate: <b>${features[i].properties.IPR_EST}</b>`);

      // Adds the circle marker to the schoolsLayer.
      schoolsLayer.addLayer(circleMarker);
    }
  }


  // Add the schools layer to the map.
  schoolsLayer.addTo(myMap);


  // Add the layer control to the map.
  L.control.layers(null, {"Schools": schoolsLayer}, { collapsed: false }).addTo(myMap);
  

// Legend setup:

// Defines the IPR_EST's and their corresponding colors in an object.
let iprEstColors = {
  "0-200": "red",
  "200-400": "orange",
  "400-600": "yellow",
  "600-800": "green",
  "800+": "darkgreen" 
};

let legend = L.control({ position: "bottomright" });          // Legend position on the map.
legend.onAdd = function(map) {
  let div = L.DomUtil.create("div", "info legend");           // Creates a div with a class called 'info legend'.
  let labels = [];                                            // Array set up to store legend's content. 

  // Loops through the iprEstColors object and for each key (IPR_EST range), and value (color), their content and style are appended to the labels array.
  Object.entries(iprEstColors).forEach(([range, color]) => {
    labels.push(
      '<i style="background:' + color +'"></i>' + range 
    );
  });

   // Enters the labels array within the div and separates each line with a line break.
  div.innerHTML = labels.join("<br>"); 
  return div;
  };

  // Add the legend to the map.
  legend.addTo(myMap);

});


// Add the reset button using a unseen in class Leaflet plugin. 
L.control.resetView({
  position: "topleft",
  title: "Reset view",
  latlng: L.latLng([43, -75.5]),
  zoom: 7,
}).addTo(myMap);
