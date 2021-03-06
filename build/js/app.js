(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "iZyQjY1I1JaKIv0GwiE45PAK47xp0D6if4fn99qu";

},{}],2:[function(require,module,exports){
Incident = function(){
};

Incident.prototype.getIncidentData = function(makeRow, displayIncidentDate, displayIncidentTitle, displayType, displayUrl) {
  $.get('https://eonet.sci.gsfc.nasa.gov/api/v2.1/events?').then(function(response) {
    response.events.forEach(function(event){
      makeRow();
      displayIncidentDate(event.geometries[0].date);
      displayIncidentTitle(event.title);
      displayType(event.categories[0].title);
      displayUrl(event.sources[0].url);
    });
  }).fail(function(error) {
    $('#row-awesome').append("<tr><td>not found</td></tr>");
  });
};


Incident.prototype.initMap = function() {
  var amarillo = {lat: 35.221997, lng: -101.831297};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: amarillo
  });
  var marker = new google.maps.Marker({
    position: amarillo,
    map: map
  });
  $.get('https://eonet.sci.gsfc.nasa.gov/api/v2.1/events?').then(function(response) {
    response.events.forEach(function(event){
      var latLng = new google.maps.LatLng(
        event.geometries[0].coordinates[0], event.geometries[0].coordinates[1]
      );
      console.log(latLng);
      console.log(event.geometries[0].coordinates[0]);
      console.log(event.geometries[0].coordinates[1]);
      new google.maps.Marker({
        position: latLng,
        map: map
      });
    });
    // console.log(response.events[0].geometries[0].coordinates[0]);
    // console.log(response.events[0].geometries[0].coordinates[1]);
  });
};


exports.incidentsModule = Incident;

},{}],3:[function(require,module,exports){
var apiKey = require('./../.env').apiKey;

Potd = function(){
};

Potd.prototype.getDate = function(displayDate) {
  $.get('https://api.nasa.gov/planetary/apod?api_key=' + apiKey).then(function(response) {
      displayDate(response.date);
  }).fail(function(error) {
    $('.date').text("date not found");
  });
};

Potd.prototype.getTitle = function(displayTitle) {
  $.get('https://api.nasa.gov/planetary/apod?api_key=' + apiKey).then(function(response) {
    displayTitle(response.title);
  }).fail(function(error) {
    $('.title').text("title not found");
  });
};

Potd.prototype.getDescription = function(displayDescription) {
  $.get('https://api.nasa.gov/planetary/apod?api_key=' + apiKey).then(function(response) {
    displayDescription(response.explanation);
  }).fail(function(error) {
    $('.description').text("description not found");
  });
};

Potd.prototype.getHdurl = function(displayHdurl) {
  $.get('https://api.nasa.gov/planetary/apod?api_key=' + apiKey).then(function(response) {
    displayHdurl(response.hdurl);
  }).fail(function(error) {
    $('.container').append("picture not found");
  });
};

exports.potdModule = Potd;

},{"./../.env":1}],4:[function(require,module,exports){
var Incident =  require('./../js/incidents.js').incidentsModule;

var makeRow = function() {
  $('#table-body').append(`<tr></tr>`);
};

var displayIncidentDate = function(date){
  $('tr').last().append(`<td>${date}</td>`);
};

var displayIncidentTitle = function(title){
  $('tr').last().append(`<td>${title}</td>`);
};

var displayType = function(type){
  $('tr').last().append(`<td>${type}</td>`);
};

var displayUrl = function(url){
  $('tr').last().append(`<td><a href="${url}" target="_blank">${url}</a></td>`);
};

// var displayCoordinates = function(lat, long){
//
// }





$(document).ready(function() {
  // var map;
  var incident = new Incident();
  incident.getIncidentData(makeRow, displayIncidentDate, displayIncidentTitle, displayType, displayUrl);
  incident.initMap();
  // incident.getCoordinates();
});

var Potd = require('./../js/mashup.js').potdModule;

var displayDate = function(date){
  $('.date').text(date);
};

var displayTitle = function(title){
  $('.title').text(title);
};

var displayDescription = function(description){
  $('.description').text(description);
};

var displayHdurl = function(hdurl){
  $('body').css('background-image', 'url(' + hdurl + ')');
};

$(document).ready(function() {
  $('#pic-button').click(function() {
    var newPotd = new Potd();
    $('.start').hide();
    newPotd.getDate(displayDate);
    newPotd.getTitle(displayTitle);
    newPotd.getDescription(displayDescription);
    newPotd.getHdurl(displayHdurl);
    $('#incident-button').delay(1000).show(0);
  });
});

},{"./../js/incidents.js":2,"./../js/mashup.js":3}]},{},[4]);
