// Gets the data with d3 and performs the processData function with it.
d3.csv('static/sql/ny_wealth.csv').then(processData)

// Defines the steps taken when the processData function is called.
function processData(data) {

  // Scatter chart's layout:
  let layout = {

    // Defines the text and position of the scatter chart's title.
    title: {
      text: 'Scatter Chart: Count vs. Receives Public Assistance Count',
      x: 0.5 
    },

    // Defines the x axis label and ensures the zero line is not shown.
    xaxis: {
      title: 'Count of selected demographic', 
      zeroline: false
    },

    // Defines the x axis label and ensures the zero line is not shown.
    yaxis: {
      title: 'Count Receives Public Assistance',
      zeroline: false
    },

    // Assigns thr margins for the left, right, bottom, and top of the chart. 
    margin: {
      l: 60, // Add left margin for y-axis title
      r: 20,
      b: 60, // Add bottom margin for x-axis title
      t: 80 // Add top margin for title
    }

  };

  // Nested function which will update the scatter plot with the correct x axis and y axis data based on the user's selection.
  function updatePlot(selectedXAxis) {

    // Maps the values from the selected x axis's column into a new array and converts them into integers.
    let xData = data.map(column => parseInt(column[selectedXAxis]));

    // Maps the values from the 'count_receives_public_assistance' column into a new array and converts them into integers.
    let yData = data.map(row => parseInt(row['count_receives_public_assistance']));

    // To allow the scatter plot's markers to change color and size based on a scale, the yData array's min and max values are found.
    let minValue = Math.min.apply(null, yData);
    let maxValue = Math.max.apply(null, yData);

    // Defines what to plot: (axis data, how to plot datapoints, chart type, color of the markers).
    let trace1 = [{
      // Axis data.
      x: xData,
      y: yData,
      // How to plot the data points.
      mode: 'markers',
      // Chart Type
      type: 'scatter',
      // Conditional marker color (dependant on value y axis's data points).
      marker: {
        color: yData.map(value => {
          if (value >= maxValue * 0.75) {
            return 'red';
          } else if (value >= maxValue * 0.50) {
           return 'orangered'; 
          } else if (value >= maxValue * 0.25) {
            return 'yellowgreen'; 
          } else {
            return 'green'; 
         }
        }),
        // Empty array to store marker sizes.
        size: [] 
      }
    }];

    // Goes through each value in yData and assigns a size based on it's value (follows the linear format of y = mx + c).
    yData.forEach(value => {
      let size = 10 + (value / maxValue) * 50; 
      // Once the marker's size is determined, it gets pushd to the size array.
      trace1[0].marker.size.push(size);
    });

    // Creates the plot.
    Plotly.newPlot('nyc-demographics-scatter', trace1, layout);
  }
  
  // Default x axis will use the female demogrpahic per zip code. 
  updatePlot('count_female');

  // Event handler: If user selects the drop down, the updatePlot function is called with the new x axis data.
  // Assigns the HTML id which holds the drop down menu to a variable valled xAxisDropdown.
  let xAxisDropdown = document.getElementById('xAxisDropdown');
  // When this element is changed...
  xAxisDropdown.addEventListener('change', () => {
  // Calls the updatePlot function using the value of the dropdown option selected. 
  updatePlot(xAxisDropdown.value);
  });
}