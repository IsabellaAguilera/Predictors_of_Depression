function buildPlot(){

  var url = "/api_alcohol";
  d3.json(url).then(function(response) {
    var data = response;
    var layout = {title : "Alcohol plot"};

    var depression_rate = data.map(function(record) {
      return record['Dep_Yes%'];
    });
    var alcohol_rate = data.map(function(record){
      return record['Yes%'];
    });

    var trace1 = {
      x: alcohol_rate,
      y: depression_rate,
      name: 'alcohol vs. depression',
      mode:'markers',
      type: 'scatter'
    };

    var data2 = [trace1];

    Plotly.plot("plot", data2, layout);
  });
}
buildPlot();
