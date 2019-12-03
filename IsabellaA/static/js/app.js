// var base_url = "/api_";
// var base_geojson_url = "/geojson_";

// const API_KEY = "pk.eyJ1IjoiZHJpdmVyYTUzNyIsImEiOiJjanZlZTJieWcwbmlsNDRwbDV1ZHRxdmxnIn0.eZ3XMovyBxLUPfWtg0VPuw";

// var full_url;
console.log("START")

// var first_time = true;

// function buildDepressionPlot(){

//   var url = '/api_Income'
//   d3.json(url).then(function(response) {
//     var data = response;
//     var layout = {title : "Depression Plot"};
//     var layout2 = {title: "Depression Bar Chart"}
//     var depression_rate = data.map(function(record) {
//       return record['yes_percent'];
//     });
//     var states = data.map(function(record){
//       return record['state']
//     });
//     var trace1 = {
//       x: states,
//       y: depression_rate,
//       name: "depression by state",
//       type: "bar"
//     };
//     var trace2 = {
//       values: depression_rate,
//       labels: states,
//       name: "depression by state",
//       type: "pie"
//     };

//     var data1 = [trace1]
//     var data2 = [trace2]

//     Plotly.plot("plot4", data2, layout);
//     Plotly.plot("plot3", data1, layout2);
//   });


// function buildIncomePlot(url){
//     // d3.select("#plot1").text("You selected " + full_url);
//     // console.log("PART 1")
//   var url = "/api_Income";
//   var income_url = url;
//   d3.json(income_url).then(function(response) {

//     var data = response;

//     var depression_rate = data.map(function(record) {
//       return record['yes_percent'];
//     });
//     var income = data.map(function(record){
//       return record['factor'];
//     });
  
//     var states = data.map(function(record){
//       return record['state']
//     });

//     var layout1 = {
//       title: "Income and Depression Plot",
//       xaxis: {
//         range: [0, 100]
//         },
//       yaxis: {
//         range: [0, 100]
//         },
//       legend: {
//         y: 0.5,
//         yref: 'paper',
//         font: {
//           family: 'Merriweather, serif',
//           size: 20
//         }
//       }
//     };

//     var layout2 = {
//       title: "Income vs Depression",
//       barmode: 'group'
//     };

//     var abbreviation = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID',
//     'IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE',
//     'NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD',
//     'TN','TX','UT','VT','VA','WA','WV','WI','WY']
  
//     var trace1 = {
//       x: income,
//       y: depression_rate,
//       mode:'markers+text',
//       marker: {
//         symbol: 'diamond',
//         color: '#2800F2'

//       },
//       textposition: "top center",
//       textfont: {
//          // found on http://fontcdn.org/
//         family: 'Merriweather, serif'
//         },
//       marker: { 
//         symbol: 'diamond',
//         size: 10 },
//       text: abbreviation,
//       name: "Income and Depression",
//       type: 'scatter'
//     };
  
//     var trace2 = {
//       x: states,
//       y: factor,
//       name: "Income by State",
//       type: "bar"
//     };
  
//     var trace3 = {
//       x: states,
//       y: depression_rate,
//       name: "Depression by State",
//       type: "bar"
//     };
  
//     var data2 = [trace1];
//     var data3 = [trace2, trace3];
  
//     Plotly.plot("plot4", data2, layout1);
//     Plotly.plot("plot3", data3, layout2);
//   });
// }
  



// var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
// var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// var chartGroup = svg
//     .append("g")
//     .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// var svg = d3
//     .select(".bottom right")
//     .append("svg")
//     .attr("height", svgHeight)
//     .attr("width", svgWidth);

// var svgGroup = svg
//     .selectAll("rect")
//     .data()

// }