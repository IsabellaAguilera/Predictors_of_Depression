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
    //var layout = {title : "Depression Plot"};
    //var layout2 = {title: "Depression Bar Chart"}
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

    Plotly.plot("plot4", data2);
    Plotly.plot("plot3", data1);
  });
}

function buildFactorPlot(source){

  var factor_url = base_url + source;
  d3.json(factor_url).then(function(response) {
    var data = response;

    var title = data[0]["Type"];

    var layout = {title : `${title} Plot`};
    var layout2 = {title: `${title} Bar Chart`};

    var depression_rate = data.map(function(record) {
      return record['yes_percent'];
    });
    var factor_rate = data.map(function(record){
      return record['factor'];
    });

    var states = data.map(function(record){
      return record['state']
    });

    var trace1 = {
      x: factor_rate,
      y: depression_rate,
      mode:'markers',
      type: 'scatter',
      text: states,
      hovertemplate: '<i><b>%{text}</b></i>'
    };

    var trace2 = {
      x: states,
      y: factor_rate,
      name: `${title} by state`,
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
      onEachFeature: function(feature, layer) {
        layer.bindPopup("Location: " + feature.properties.name + "<br>" + feature.properties.depression + "%");
      }
    }).addTo(map);
  });

}


function buildFactorMap(source){
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

  var geojson_url = base_geojson_url + source;

  // Grabbing our GeoJSON data..
  d3.json(geojson_url).then(function(data) {
    // Creating a GeoJSON layer with the retrieved data
    geojson = L.choropleth(data, {
      // Define what  property in the features to use

      valueProperty: data.features[0].properties.FACTOR.toUpperCase(),

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
      onEachFeature: function(feature, layer) {
        if(feature.properties.FACTOR == 'Income'){
          layer.bindPopup("Location: " + feature.properties.NAME + "<br>" + feature.properties.FACTOR + " $" + feature.properties.INCOME);
        }
        else if(feature.properties.FACTOR == 'Alcohol'){
          layer.bindPopup("Location: " + feature.properties.NAME + "<br>" + feature.properties.ALCOHOL + "%");
        }
        else if(feature.properties.FACTOR == 'Poverty'){
          layer.bindPopup("Location: " + feature.properties.NAME + "<br>" + feature.properties.POVERTY + "%");
        }
        else if(feature.properties.FACTOR == 'Obesity'){
          layer.bindPopup("Location: " + feature.properties.NAME + "<br>" + feature.properties.OBESITY + "%");
        }
      }
    }).addTo(map);

  });

}



function buildVideo(){
  $("div#map2").append('<iframe width="705" height="415" src="https://www.youtube.com/embed/fWFuQR_Wt4M" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
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
      buildVideo();
      return;
    }
    else{
    full_url = base_url + source;
    full_geojson_url = base_geojson_url + source;

    //console.log(full_url);
    //d3.select("#plot1").text("You selected " + full_url);
    console.log("button")
    buildFactorPlot(source);
    buildDepressionMap();
    buildFactorMap(source);
  }
}
if (first_time){
  console.log("first_time")
  buildDepressionPlot();
  buildDepressionMap();
  buildVideo();
}
