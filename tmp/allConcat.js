var Incident =  require('./../js/incidents.js').incidentsModule;

var displayIncidentDate = function(response){
  $('#row-awesome').append(`<td>${date}</td>`);
};



  var displayIncidentTitle = function(title){
    $('#row-awesome').append(`<td>${title}</td>`);
  };

  var displayType = function(type){
    $('#row-awesome').append(`<td>${type}</td>`);
  };

  var displayUrl = function(url){
    $('#row-awesome').append(`<td>${url}</td>`);
  };
  
// var displayIncidentData = function(response){
//   response.forEach(function(event) {
//     $('#row-awesome').append(`<td>${event.date}</td>`);
//     $('#row-awesome').append(`<td>${title}</td>`);
//     $('#row-awesome').append(`<td>${type}</td>`);
//     $('#row-awesome').append(`<td>${url}</td>`);
//   });
// };

// var generateTable = function(incidents) {
//   $("#table-body").empty();
//   incidents.forEach(function(incident, i){
//     $("#event").append(`<tr><td>${date}</td><td>${title>}</td><td>${person.humidity}</td></tr>`);
//   });
// };

$(document).ready(function() {
  var incident = new Incident();
  incident.getIncidentData(displayIncidentData);
  // incident.getIncidentTitle(displayIncidentTitle);
  // incident.getType(displayType);
  // incident.getUrl(displayUrl);
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
