'use strict';

var SoulfitFactory = SoulfitFactory || 'Error loading Soulfit';
var Chartist = Chartist || 'Error loading Chartist';
var soulfit = soulfit || 'Error loading soulfit';
var soulfitPerson = soulfitPerson || 'Error loading soulfit';

var chartoptions = {
  // Set your chart options here
};

function setStatusBars(soulfitPerson, soulfitTotal) {
  // Write some JQuery to set the Status Bars
}

function stringifyJSON(string) {
  return JSON.stringify(string, null, 2);
}

$(document).ready(function() {
  // Initialize soulfitObjects
  soulfit = new SoulfitFactory('https://spreadsheets.google.com/feeds/list/1zWeJSlmhone9MzwoUNxCFzBIySOMEo8OoGhClgZLGS4/default/public/values?alt=json');
  soulfitPerson = new SoulfitFactory();

  $.getJSON(soulfit.soulfitUrl)
    .done(function(data) {
      soulfit.sanitizeSoulfitDataJSON(data);
      soulfit.generateChartistData(soulfit.soulfitData);
      $('#result').html(stringifyJSON(soulfit.soulfitData));

      // Write code here to update status bars and create Chartist data;

    })
    .fail(function() {
      console.log('Error loading data');
    });

  $('#personName').on('change', function() {
    // When the personName value changes update all the data
  });
});
