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
      return record['Dep_Yes%'];
    });
    var states = data.map(function(record){
      return record['STATE NAME']
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
}

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
      return record['Dep_Yes%'];
    });
    var alcohol_rate = data.map(function(record){
      return record['Yes%'];
    });

    var states = data.map(function(record){
      return record['STATE NAME']
    });

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

function buildDepressionMap(){

  console.log("mapping");
  var map = L.map("map1", {
    center: [39.0473, -95.6752],
    zoom: 3
  });

  // Adding tile layer
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(map);

  var geojson_url = "/geojson_Depression"

  d3.json(geojson_url).then(function(data) {
    // Creating a GeoJSON layer with the retrieved data
    geojson = L.choropleth(data, {

      // Define what  property in the features to use
      valueProperty: "depression",

      // Set color scale
      scale: ["#ffffb2", "#b10026"],

      // Number of breaks in step range
      steps: 10,

      // q for quartile, e for equidistant, k for k-means
      mode: "q",
      style: {
        // Border color
        color: "#fff",
        weight: 1,
        fillOpacity: 0.8
      },

    }).addTo(map);
  });

}


function buildFactorMap(url){
  // Creating map object
  console.log("mapping")
  var map = L.map("map2", {
    center: [39.0473, -95.6752],
    zoom: 3
  });

  // Adding tile layer
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(map);

  var geojson_url = url;

  // Grabbing our GeoJSON data..
  d3.json(geojson_url).then(function(data) {
    // Creating a GeoJSON layer with the retrieved data
    geojson = L.choropleth(data, {

      // Define what  property in the features to use
      valueProperty: "alcohol",

      // Set color scale
      scale: ["#ffffb2", "#b10026"],

      // Number of breaks in step range
      steps: 10,

      // q for quartile, e for equidistant, k for k-means
      mode: "q",
      style: {
        // Border color
        color: "#fff",
        weight: 1,
        fillOpacity: 0.8
      },

    }).addTo(map);

    // L.geoJson(data, {
    //     style: function(feature) {
    //       return {
    //         color: "white",
    //         // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
    //         fillColor: "purple",
    //         fillOpacity: 0.5,
    //         weight: 1.5
    //       };
    //     }
    //   }).addTo(map);
  });

}

function  dispatchButton(source) {
    //d3.select("#commentary").text("You selected " + source);
    first_time = false;

    $("div#map1").empty();
    $("div#map1").replaceWith( '<div class="col-md-6 quarter" id="map1"></div>' );
    $("div#map2").empty();
    $("div#map2").replaceWith( '<div class="col-md-6 quarter" id="map2"></div>' );
    Plotly.purge('plot3');
    Plotly.purge('plot4');

    if(source == 'Depression'){
      buildDepressionPlot();
      buildDepressionMap();
      return;
    }
    else{
    full_url = base_url + source;
    full_geojson_url = base_geojson_url + source;

    //console.log(full_url);
    //d3.select("#plot1").text("You selected " + full_url);
    console.log("button")
    buildFactorPlot(full_url);
    buildDepressionMap();
    buildFactorMap(full_geojson_url);
  }
}
if (first_time){
  console.log("first_time")
  buildDepressionPlot();
  buildDepressionMap();
}
