// Gets the data with d3.
d3.csv("static/sql/median_income_nyc_boroughs.csv").then(function(data) {

  // Maps each column from the CSV file into an array (converting its data type to a float where relevant).
  let boroughs = data.map(row => row.Borough);
  let medianIncomeArray = data.map(row => parseFloat(row.Median_Income));
  let latitudeArray = data.map(row => parseFloat(row.Latitude));
  let longitudeArray = data.map(row => parseFloat(row.Longitude));

  // Generates a array of tool tips based on each borough's ethnicity percentage breakdown. 
  let tooltips = data.map(row => {
    return `${row.Borough}<br>` +
           `White: ${parseFloat(row.Perc_White * 100).toFixed(2)}%<br>` +
           `Black: ${parseFloat(row.Perc_Black * 100).toFixed(2)}%<br>` +
           `Asian: ${parseFloat(row.Perc_Asian * 100).toFixed(2)}%<br>` +
           `Other: ${parseFloat(row.Perc_Other * 100).toFixed(2)}%<br>` +
           `Hispanic: ${parseFloat(row.Perc_Hispanic * 100).toFixed(2)}%`;
  });

  // Heat map's layout:
  let layout = {
    title: "New York Boroughs Heatmap",
    xaxis: { title: "Longitude" },
    yaxis: { title: "Latitude" },
  };

  // Defines what to plot: (chart type, axis data, color scale, and tooltips).
  let trace1 = [
    {
      type: "heatmap",
      x: longitudeArray,
      y: latitudeArray,
      z: medianIncomeArray,
      colorscale: "Viridis",
      hoverinfo: "text",
      text: tooltips, 
    },
  ];

  // Creates the plot.
  Plotly.newPlot("income-heatmap", trace1, layout);
});
