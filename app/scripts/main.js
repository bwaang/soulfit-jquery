'use strict';

var SoulfitFactory = SoulfitFactory || 'Error loading Soulfit';
var Chartist = Chartist || 'Error loading Chartist';
var jsonString, jsonFullString;

var chartoptions = {
  fullWidth: true,
  seriesBarDistance: 20,
  stackBars: true,
  lineSmooth: true
};

function setStatusBars(person, total) {
  $('#personRunning').attr({
    'aria-valuemax': total.totalRunning,
    'aria-valuenow': person.totalRunning,
    'style': 'width: '+ person.totalRunning / total.totalRunning * 100 +'%'
  });
  $('#personReading').attr({
    'aria-valuemax': total.totalPages,
    'aria-valuenow': person.totalPages,
    'style': 'width: '+ person.totalPages / total.totalPages * 100 +'%'
  });

  $('#personRunning').html(person.totalRunning);
  $('#personReading').html(person.totalPages);
}

function stringifyJSON(string) {
  return JSON.stringify(string, null, 2);
}

$(document).ready(function() {
  var soulfit = new SoulfitFactory('https://spreadsheets.google.com/feeds/list/1zWeJSlmhone9MzwoUNxCFzBIySOMEo8OoGhClgZLGS4/default/public/values?alt=json');
  var soulfitPerson = new SoulfitFactory();

  $.getJSON(soulfit.soulfitUrl)
    .done(function(data) {
      soulfit.sanitizeSoulfitDataJSON(data);
      soulfit.generateChartistData(soulfit.soulfitData);
      jsonFullString = stringifyJSON(soulfit.soulfitData);
      $('#soulfitDebug').html(stringifyJSON(soulfit.ctData));
      setStatusBars(soulfit, soulfit);

      $('#chartData').fadeOut('fast');
      $('#chartTime').fadeOut('fast');

      new Chartist.Bar('#chartData', soulfit.ctData, chartoptions);
      new Chartist.Line('#chartTime', soulfit.ctTimeData, chartoptions);

      $('#chartData').fadeIn('slow');
      $('#chartTime').fadeIn('slow');
    })
    .fail(function() {
      console.log('Error loading data');
    });

  $('#personName').on('change', function() {
    $('#person').html($(this).val());
    $('#chartData').fadeOut('fast');
    $('#chartTime').fadeOut('fast');
    soulfitPerson.filterByName($(this).val(), soulfit.soulfitData);
    setStatusBars(soulfitPerson, soulfit);
    $('#soulfitDebug').html(stringifyJSON(soulfitPerson.soulfitData));


    new Chartist.Bar('#chartData', soulfitPerson.ctData, chartoptions);
    new Chartist.Line('#chartTime', soulfitPerson.ctTimeData, chartoptions);

    $('#chartData').fadeIn('slow');
    $('#chartTime').fadeIn('slow');
  });
});
