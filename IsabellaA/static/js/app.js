var base_url = "/api_";
var base_geojson_url = "/geojson_";

const API_KEY = "pk.eyJ1IjoiZHJpdmVyYTUzNyIsImEiOiJjanZlZTJieWcwbmlsNDRwbDV1ZHRxdmxnIn0.eZ3XMovyBxLUPfWtg0VPuw";

var full_url;
console.log("START")

var first_time = true;

function buildDepressionPlot(){

  var url = '/api_Alcohol'
  d3.json(url).then(function(response) {
    var data = response;
    var layout = {title : "Depression Plot"};
    var layout2 = {title: "Depression Bar Chart"}
    var depression_rate = data.map(function(record) {
      return record['yes_percent'];
    });
    var states = data.map(function(record){
      return record['state']
    });
    var trace1 = {
      x: states,
      y: depression_rate,
      name: "depression by state",
      type: "bar"
    };
    var trace2 = {
      values: depression_rate,
      labels: states,
      name: "depression by state",
      type: "pie"
    };

    var data1 = [trace1]
    var data2 = [trace2]

    Plotly.plot("plot4", data2, layout);
    Plotly.plot("plot3", data1, layout2);
  });


function buildFactorPlot(url){
    // d3.select("#plot1").text("You selected " + full_url);
    // console.log("PART 1")
    //var url = "/api_alcohol";
    var factor_url = url;
    d3.json(factor_url).then(function(response) {
      var data = response;
      var layout = {title : "Alcohol Plot"};
      var layout2 = {title: "Alcohol Bar Chart"}
  
      var depression_rate = data.map(function(record) {
        return record['factor'];
      });
      var alcohol_rate = data.map(function(record){
        return record['yes_percent'];
      });
  
      var states = data.map(function(record){
        return record['state']
      });

      var abbreviation = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID',
      'IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE',
      'NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD',
      'TN','TX','UT','VT','VA','WA','WV','WI','WY']
  
      var trace1 = {
        x: alcohol_rate,
        y: depression_rate,
        name: 'alcohol vs. depression',
        mode:'markers',
        type: 'scatter'
      };
  
      var trace2 = {
        x: states,
        y: alcohol_rate,
        name: "alcohol by state",
        type: "bar"
      };
  
      var trace3 = {
        x: states,
        y: depression_rate,
        name: "depression by state",
        type: "bar"
      };
  
      var data2 = [trace1];
      var data3 = [trace2, trace3];
  
      Plotly.plot("plot4", data2, layout);
      Plotly.plot("plot3", data3, layout2);
    });
  }
  


function buildFactorPlot(url){
    // d3.select("#plot1").text("You selected " + full_url);
    // console.log("PART 1")
    //var url = "/api_alcohol";
  var factor_url = url;
  d3.json(factor_url).then(function(response) {

    var data = response;

    var layout1 = {
      title: factor + "and depression plot",
      xaxis: {
        range: [ 0, 100 ]
        },
      yaxis: {
        range: [0, 100]
        },
      legend: {
        y: 0.5,
        yref: 'paper',
        font: {
          family: ''Merriweather', serif',
          size: 20
        }
      },
    };

    var layout2 = {
      title: factor + " vs depression",
      barmode: 'group'
    }
  
    var depression_rate = data.map(function(record) {
      return record['yes_percent'];
    });
    var factor = data.map(function(record){
      return record['factor'];
    });
  
    var states = data.map(function(record){
      return record['state']
    });

    var abbreviation = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID',
    'IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE',
    'NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD',
    'TN','TX','UT','VT','VA','WA','WV','WI','WY']
  
    var trace1 = {
      x: factor,
      y: depression_rate,
      name: 'depression rate',
      mode:'markers+text',
      marker: {
        symbol: 'circle',
        color: '#2800F2'

      }
      textposition: 'top center',
      textfont: {
         // found on http://fontcdn.org/
        family: ''Merriweather', serif'
        },
      marker: { 
        symbol: 'diamond'
        size: 10 },
      text: abbreviation
      type: 'scatter'
    };
  
    var trace2 = {
      x: states,
      y: factor,
      name: factor " by state",
      type: "bar"
    };
  
    var trace3 = {
      x: states,
      y: depression_rate,
      name: "depression by state",
      type: "bar"
    };
  
    var data2 = [trace1];
    var data3 = [trace2, trace3];
  
    Plotly.plot("plot4", data2, layout1);
    Plotly.plot("plot3", data3, layout2);
  });
}
  



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