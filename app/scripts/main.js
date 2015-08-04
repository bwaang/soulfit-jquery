'use strict';

var SoulfitFactory = SoulfitFactory || 'Error loading Soulfit';
var Chartist = Chartist || 'Error loading Chartist';

var chartoptions = {
  // Set your chart options here
};

function setStatusBars(soulfitPerson, soulfitTotal) {
  // Write some JQuery to set the Status Bars
}

function stringifyJSON(string) {
  return JSON.stringify(string, null, 2);
}

function fetchSoulfitData(soulfitObj) {
  $.getJSON(soulfitObj.soulfitUrl)
    .done(function(data) {
      soulfitObj.sanitizeSoulfitDataJSON(data);
      soulfitObj.generateChartistData(soulfitObj.soulfitData);
      $('#soulfitDebug').html(stringifyJSON(soulfitObj.soulfitData));

      // Write code here to update status bars and create Chartist data;

    })
    .fail(function() {
      console.log('Error loading data from ' + soulfitObj.soulfitUrl);
    });
}

// Do JQuery manipulation here:

$(document).ready(function() {
  // Initialize soulfitObjects
  var soulfitUrl = 'https://spreadsheets.google.com/feeds/list/1zWeJSlmhone9MzwoUNxCFzBIySOMEo8OoGhClgZLGS4/default/public/values?alt=json';
  var soulfit = new SoulfitFactory(soulfitUrl);
  var soulfitPerson = new SoulfitFactory();

  fetchSoulfitData(soulfit);

  $('#personName').on('change', function() {
    // When the personName value changes update all the data

    $('#person').html($(this).val());
  });
});
