//ESTABLISH DATA=======================================
var datasetJSON = "https://raw.githubusercontent.com/EvanOJ/midterm/master/histograms.json";
var statesGeoJSON = "https://raw.githubusercontent.com/EvanOJ/midterm/master/US_EUI.geojson";
// var garbageData = "https://raw.githubusercontent.com/CPLN690-MUSA610/datasets/master/geojson/philadelphia-garbage-collection-boundaries.geojson";



var map = L.map('map', {
  center: [39.9522, -75.1639],
  zoom: 4
});
var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

$("#close-reset").click(function(){
  closebutton();
});
var closebutton = function() {
  this.map.setView(new L.LatLng(40.000, -75.1090), 11);
};
//===================================================
// function highlightFeature(e) {
//
//     var layer = e.target;
//
//     layer.setStyle({
//         weight: 5,
//         color: '#000000',
//         dashArray: '',
//         fillOpacity: 0.7
//     });
//     if (!L.Browser.ie && !L.Browser.opera) {
//         layer.bringToFront();
//     }
// }
// function resetHighlight(e) {
//     myFeatureGroup.resetStyle(e.target);
//
// }

function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}
var eachFeature = function(feature, layer) {
  layer.on({
    // mousover:highlightFeature,
    // mouseout:resetHighlight,
    click: zoomToFeature,
  });
};
var info = L.control();

// info.onAdd = function (map) {
//     this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
//     this.update();
//     return this._div;
// };

// method that we will use to update the control based on feature properties passed
// info.update = function (props) {
//     this._div.innerHTML = '<h4>US Population Density</h4>' +  (props ?
//         '<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>'
//         : 'Hover over a state');
// };

// info.addTo(map);

var myFeatureGroup;
var x=0;
$("button").click(function(){
myFeatureGroup.clearLayers();
var y=$(this).val();
if (y==1){
x--;
}
if (y==2){
x++;
}
console.log(x);
if(x===0){
setSlideOne();
}else if(x==1){
setSlideTwo();
}else if(x==2){
setSlideThree();
}else if(x==3){
setSlideFour();
}else if(x==4){
setSlideFive();
}else if(x==5){
setSlideSix();
}
});



var style1 = function(feature){
  function getColor(d) {
   return d> 110 ? '#800026' :
    d> 90 ? '#BD0026' :
    d> 80 ? '#E31A1C':
    d> 70 ? '#FC4E2A' :
    d> 60 ? '#FD8D3C' :
    d> 50 ? '#FEB24C' :
           'none' ;
 }
  return{
    fillColor: getColor(feature.properties.SITE_EUI),
    weight:2,
    opacity: 1,
    color:"white",
    dashArray:"3",
    fillOpacity: 0.7,
};
};

var setSlideOne = function() { $.ajax(statesGeoJSON).done(function(data) {
  $('#previous-button').hide();

  map.setView(new L.LatLng(50.000,-115), 4);
  var parsedData = JSON.parse(data);
  myFeatureGroup = L.geoJson(parsedData, {
  onEachFeature: eachFeature,
  style: style1,
  }).addTo(map);
  });

  $('#chart1').text("US 78").css('background','#FC4E2A');
  $('#chart2').hide();
  $('#chart3').hide();
  $('#chart4').hide();
  $('#chart5').hide();

  $('#description').text("Site Energy Use Intensity");
  $('#subtext1').text("If you add up all the energy (Btus) you are consuming at the meter, this is what is known as site energy. EUI is measured in kBtu/sqft/yr. The mean site EUI for the United States is 78 kBtu/sqft/yr.");
  $('#subtext2').text("The Building Performance Database (BPD) is the nation's largest dataset of information about the energy-related characteristics of commercial and residential buildings. There are 130,114 commercial buidlings recorded in the BPD.");

  $( "table tr:nth-child(2) td:nth-child(1)" ).css("background-color", "#800026").text(">110");
  $( "table tr:nth-child(2) td:nth-child(3)" ).css("background-color", "#BD0026").text("90-110");
  $( "table tr:nth-child(2) td:nth-child(4)" ).css("background-color", "#E31A1C").text("80-90");
  $( "table tr:nth-child(2) td:nth-child(5)" ).css("background-color", "#FC4E2A").text("70-80");
  $( "table tr:nth-child(2) td:nth-child(6)" ).css("background-color", "#FD8D3C").text("60-70");
  $( "table tr:nth-child(2) td:nth-child(7)" ).css("background-color", "#FEB24C").text("<60");

};

var style2 = function(feature){
  function getColor(d) {
   return d>= 110 ? '#800026' :
    d<110 ? 'none' :
           'none' ;
 }
  return{
    fillColor: getColor(feature.properties.SITE_EUI),
    weight:2,
    opacity: 1,
    color:"white",
    dashArray:"3",
    fillOpacity: 0.7,
};
};

var setSlideTwo = function() { $.ajax(statesGeoJSON).done(function(data) {
map.setView(new L.LatLng(65.000,-151.0000), 5);
var parsedData = JSON.parse(data);
myFeatureGroup = L.geoJson(parsedData, {
onEachFeature: eachFeature,
style: style2,
}).addTo(map);
});
$('#next-button').show();
$('#previous-button').show();

$('#chart1').text("US 78");
$('#chart2').show().text("AK 110").css('background','#800026');
$('#chart3').hide();
$('#chart4').hide();
$('#chart5').hide();


$('#description').text("Site Energy Use Intensity");
$('#subtext1').text("Alaska has the highest mean site EUI recorded by the BPD. There are 106 commercial buildings in the this dataset, 94 of which are included in this query. 3.19% of buildings exceed an EUI of 500, while less than 1% are recorded below 20%.");
$('#subtext2').text("");

$( "table tr:nth-child(2) td:nth-child(1)" ).css("background-color", "#800026").text(">110");
$( "table tr:nth-child(2) td:nth-child(3)" ).css("background-color", "#BD0026").text("90-110");
$( "table tr:nth-child(2) td:nth-child(4)" ).css("background-color", "#E31A1C").text("80-90");
$( "table tr:nth-child(2) td:nth-child(5)" ).css("background-color", "#FC4E2A").text("70-80");
$( "table tr:nth-child(2) td:nth-child(6)" ).css("background-color", "#FD8D3C").text("60-70");
$( "table tr:nth-child(2) td:nth-child(7)" ).css("background-color", "#FEB24C").text("<60");

};

var style3 = function(feature){
  function getColor(d) {
   return d<=51 ? '#FEB24C' :
               'none' ;
 }
  return{
    fillColor: getColor(feature.properties.SITE_EUI),
    weight:2,
    opacity: 1,
    color:"white",
    dashArray:"3",
    fillOpacity: 0.7,

};
};

var setSlideThree = function() { $.ajax(statesGeoJSON).done(function(data) {
map.setView(new L.LatLng(44.000,-100.000), 7);
var parsedData = JSON.parse(data);
myFeatureGroup = L.geoJson(parsedData, {
onEachFeature: eachFeature,
style: style3,
}).addTo(map);
});
$('#next-button').show();
$('#previous-button').show();

$('#chart1').text("US 78");
$('#chart2').show().text("AK 110");
$('#chart3').show().text("SD 51").css('background','#FEB24C');
$('#chart4').hide();
$('#chart5').hide();


$('#description').text("Site Energy Use Intensity");
$('#subtext1').text("South Dakota has the lowest mean site EUI recorded by the BPD. There are 211 commercial buildings in the this dataset, 206 of which are included in this query. 0.49% of buildings exceed an EUI of 400, while less than 2.91% are recorded below 10%.");
$('#subtext2').text("");

$( "table tr:nth-child(2) td:nth-child(1)" ).css("background-color", "#800026").text(">110");
$( "table tr:nth-child(2) td:nth-child(3)" ).css("background-color", "#BD0026").text("90-110");
$( "table tr:nth-child(2) td:nth-child(4)" ).css("background-color", "#E31A1C").text("80-90");
$( "table tr:nth-child(2) td:nth-child(5)" ).css("background-color", "#FC4E2A").text("70-80");
$( "table tr:nth-child(2) td:nth-child(6)" ).css("background-color", "#FD8D3C").text("60-70");
$( "table tr:nth-child(2) td:nth-child(7)" ).css("background-color", "#FEB24C").text("<60");

};

var style4 = function(feature){
  function getColor(d) {
   return d> 300 ? '#253494' :
          d> 250 ? '#2c7fb8' :
          d> 200 ? '#41b6c4' :
          d> 150 ? '#7fcdbb' :
          d> 100 ? '#c7e9b4' :
          d> 50 ? '#edf8b1' :
                    'none' ;
 }
  return{
    fillColor: getColor(feature.properties.SOURCE_EUI),
    weight:2,
    opacity: 1,
    color:"white",
    dashArray:"3",
    fillOpacity: 0.7,

};
};

var setSlideFour = function() { $.ajax(statesGeoJSON).done(function(data) {
  map.setView(new L.LatLng(50.000,-115), 4);
  var parsedData = JSON.parse(data);
  myFeatureGroup = L.geoJson(parsedData, {
  onEachFeature: eachFeature,
  style: style4,
  }).addTo(map);
  });
  $('#next-button').show();
  $('#previous-button').show();

  $('#chart1').text("US 184").css('background-color','#7fcdbb').width('30%');
  $('#chart2').hide();
  $('#chart3').hide();
  $('#chart4').hide();
  $('#chart5').hide();


  $('#description').text("Source Energy Use Intensity");
  $('#subtext1').text("Source energy is a measure that accounts for the energy consumed on site in addition to the energy consumed during generation and transmission in supplying the energy to your site.");
  $('#subtext2').text("The mean source EUI for the United States is 184 kBtu/sqft/yr.");

  $( "table tr:nth-child(2) td:nth-child(1)" ).css("background-color", "#253494").text("<300");
  $( "table tr:nth-child(2) td:nth-child(3)" ).css("background-color", "#2c7fb8").text("250-300");
  $( "table tr:nth-child(2) td:nth-child(4)" ).css("background-color", "#41b6c4").text("200-250");
  $( "table tr:nth-child(2) td:nth-child(5)" ).css("background-color", "#7fcdbb").text("150-200");
  $( "table tr:nth-child(2) td:nth-child(6)" ).css("background-color", "#c7e9b4").text("100-150");
  $( "table tr:nth-child(2) td:nth-child(7)" ).hide();

};

var style5 = function(feature){
  function getColor(d) {
   return d>= 300 ? '#253494' :
          d< 300 ? 'none' :
                  'none' ;
 }
  return{
    fillColor: getColor(feature.properties.SOURCE_EUI),
    weight:2,
    opacity: 1,
    color:"white",
    dashArray:"3",
    fillOpacity: 0.7,

};
};

var setSlideFive = function() { $.ajax(statesGeoJSON).done(function(data) {
  map.setView(new L.LatLng(18.5,-66.5), 9);
  var parsedData = JSON.parse(data);
  myFeatureGroup = L.geoJson(parsedData, {
  onEachFeature: eachFeature,
  style: style5,
  }).addTo(map);
  });
  $('#next-button').show();
  $('#previous-button').show();

  $('#chart1').text("US 184").css('background-color','#7fcdbb');
  $('#chart2').show().text("PR 329").css('background-color','#253494').width('60%');
  $('#chart3').hide();
  $('#chart4').hide();
  $('#chart5').hide();


  $('#description').text("Source Energy Use Intensity");
  $('#subtext1').text("Puerto Rico has the highest mean site EUI recorded by the BPD. There are 66 commercial buildings in the this dataset, 65 of which are included in this query. 3.08% of buildings exceed an EUI of 300, while less than 1.54% are recorded below 10%.");
  $('#subtext2').text("");

  $( "table tr:nth-child(2) td:nth-child(1)" ).css("background-color", "#253494").text("<300");
  $( "table tr:nth-child(2) td:nth-child(3)" ).css("background-color", "#2c7fb8").text("250-300");
  $( "table tr:nth-child(2) td:nth-child(4)" ).css("background-color", "#41b6c4").text("200-250");
  $( "table tr:nth-child(2) td:nth-child(5)" ).css("background-color", "#7fcdbb").text("150-200");
  $( "table tr:nth-child(2) td:nth-child(6)" ).css("background-color", "#c7e9b4").text("100-150");

};


var style6 = function(feature){
  function getColor(d) {
   return d<=113 ? '#c7e9b4' :
          d< 113 ? 'none' :
                    'none' ;
 }
  return{
    fillColor: getColor(feature.properties.SOURCE_EUI),
    weight:2,
    opacity: 1,
    color:"white",
    dashArray:"3",
    fillOpacity: 0.7,

};
};

var setSlideSix = function() { $.ajax(statesGeoJSON).done(function(data) {
  map.setView(new L.LatLng(44,-120), 7);
  var parsedData = JSON.parse(data);
  myFeatureGroup = L.geoJson(parsedData, {
  onEachFeature: eachFeature,
  style: style6,
  }).addTo(map);
  });
  $('#next-button').hide();
  $('#previous-button').show();

  $('#chart1').text("US 184").css('background-color','#7fcdbb');
  $('#chart2').show().text("PR 329").css('background-color','#253494').width('60%');
  $('#chart3').show().text("OR 113").css('background-color','#c7e9b4').width('20%');
  $('#chart4').hide();
  $('#chart5').hide();


  $('#description').text("Source Energy Use Intensity");
  $('#subtext1').text("Oregon has the lowest mean source EUI recorded by the BPD. There are 2,062 commercial buildings in the this dataset, 1,718 of which are included in this query. 0.87% of buildings exceed an EUI of 1250, while less than 0.47% are recorded below 25%.");
  $('#subtext2').text("");

  $( "table tr:nth-child(2) td:nth-child(1)" ).css("background-color", "#253494").text("<300");
  $( "table tr:nth-child(2) td:nth-child(3)" ).css("background-color", "#2c7fb8").text("250-300");
  $( "table tr:nth-child(2) td:nth-child(4)" ).css("background-color", "#41b6c4").text("200-250");
  $( "table tr:nth-child(2) td:nth-child(5)" ).css("background-color", "#7fcdbb").text("150-200");
  $( "table tr:nth-child(2) td:nth-child(6)" ).css("background-color", "#c7e9b4").text("100-150");
  $( "table tr:nth-child(2) td:nth-child(7)" ).css("background-color", "#c7e9b4").text("<100");

};

setSlideOne();



$(document).ready(function() {
$.ajax(statesGeoJSON).done(function(data) {
var parsedData = JSON.parse(data);
var myFeatureGroup = L.geoJson(parsedData, {
onEachFeature: eachFeature,
filter: myFilter,
style: myStyle
}).addTo(map);
console.log(myFeatureGroup);
});
});
