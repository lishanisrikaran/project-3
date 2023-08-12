// Import data using D3
d3.csv("../sql/ny_wealth.csv").then(function(wealthData) {

	console.log(wealthData);


  // Parse data as numbers(integers)
  wealthData.forEach(function(data) {
    data.count_male = parseInt(data.count_male);
    data.count_receives_public_assistance = parseInt(data.count_receives_public_assistance);
  
  });
// Set the dimensions and margins
let svgWidth = 800;
let svgHeight = 600;
let margin = {top: 40,right: 50,bottom: 100, left: 100};

// Set the scatter chart width and height
let width = svgWidth - margin.left - margin.right;
let height = svgHeight - margin.top - margin.bottom;

// Create  SVG container elements
let svg = d3.select(".chart").append("svg").attr("width", svgWidth).attr("height", svgHeight);

// append an SVG group to hold the scatter plot and shift by left and top margins.
let chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Set parameters
let xAxis = "count_male";
let yAxis = "count_receives_public_assistance ";

// Access data values for x and y
let xValue = d => d[xAxis];
let yValue = d => d[yAxis];

// Set the function used for x scale 
function xScale(wealthData, xAxis) {

  // Create x scale and add some padding space so that the circles representing the data points do not overlap with the axis line
  let xScale = d3.scaleLinear()
    .domain([d3.min(wealthData, d => d[xAxis]) * 0.9, d3.max(wealthData, d => d[xAxis]) * 1.3]) 
    .range([0, width]);
  return xScale;
}

// Set the function used for y scale and add some padding space so that the circles representing the data points do not overlap with the top and bottom of the plot area
function yScale(wealthData, yAxis) {

  // Create y scale
  let yScale = d3.scaleLinear()
    .domain([d3.min(wealthData, d => d[yAxis]) * 0.9, d3.max(wealthData, d => d[yAxis]) * 1.2]) 
    .range([height, 0]);
  return yScale;
}

// Create the x-axis label
svg.append("text")
  .attr("class", "x label")
  .attr("text-anchor", "end")
  .attr("x", width) // Position the label at the right side of the plot area
  .attr("y", height + 40) // Position the label below the x-axis
  .text("Number of Males");

  // Create the y-axis label
svg.append("text")
.attr("class", "y label")
.attr("text-anchor", "end")
.attr("y", 6) // Position the label at the top side of the plot area
.attr("dy", "-1.2em") // Shift the label up slightly to center it vertically
.attr("transform", "rotate(-90)") // Rotate the label 90 degrees counterclockwise
.text("Public Assistance Received");



  //Create two D3.js axis objects
  let bottomAxis = d3.axisBottom(xScale);
  let leftAxis = d3.axisLeft(yScale);

  // Append x axis
  svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // Append y axis
  svg.append("g")
    .attr("class", "y-axis")
    .call(leftAxis);


  // Create and place the svg groups containing the circle 
  svg.selectAll("circle")
  .data(wealthData)
  .enter()
  .append("circle")
  .attr("cx", d => xLinearScale(data.count_male))
  .attr("cy", d => yLinearScale(data.count_receives_public_assistance))
  .attr("r", 10)
  .attr("stroke", "white")
  .attr("stroke-width", "1")
  .attr("fill", "red");


  // Create the circle for each group for the scatter plot

    svg.selectAll("circle")
    .data(wealthData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(data.count_male))
    .attr("cy", d => yLinearScale(data.count_receives_public_assistance))
    .attr("r", 10)
    .attr("stroke", "white")
    .attr("stroke-width", "1")
    .attr("fill", "red");

  // Create chart title
  chartGroup.append("text")
  .attr("x", width / 2)
  .attr("y", 0 - margin.top / 2)
  .attr("text-anchor", "middle")
  .style("font-size", "16px")
  .text("New York's Wealth Distribution");
});