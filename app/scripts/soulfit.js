'use strict';
/**
 * Utility file for getting Soulfit Data from Google Sheets.
 *
 * Usage:
 *     1. You will need to include an HTML script whose src is 'https://spreadsheets.google.com/feeds/list/1zWeJSlmhone9MzwoUNxCFzBIySOMEo8OoGhClgZLGS4/default/public/values?alt=json-in-script&callback=sanitizeSoulfitDataJSON'
 *     2. If you wish to simply display the formatted JSON data, just create a div/span/pre whose id is 'result'
 */

var SoulfitFactory = function(soulfitDataUrl) {
  this.soulfitUrl = soulfitDataUrl;
  this.soulfitData = {};
  this.ctData = {};
  this.ctTimeData = {};
  this.totalRunning = 0;
  this.totalPages = 0;
  this.totalChapters = 0;

  var strToInt = function(str) {
    return (str === '') ? 0 : parseInt(str);
  };

  var isInArray = function(arr, val) {
    for(var i in arr) {
      if(arr[i] === val) {
        return i;
      }
    }
    return false;
  };

  this.sanitizeSoulfitDataJSON = function(soulfitData) {
      var rows = soulfitData.feed.entry;
      var jsonData = [];
      for (var row in rows) {
        var entry = {};
        entry.timestamp = rows[row].gsx$timestamp.$t;
        entry.gender = rows[row].gsx$brotherorsister.$t.replace('[0-9]', '').toLowerCase();
        entry.name = rows[row].gsx$name.$t.replace('[0-9]', '');
        entry.pages = strToInt(rows[row].gsx$howmanypagesofyourbookdidyouread.$t.replace(/\D/g, ''));
        entry.chapters = strToInt(rows[row].gsx$howmanychaptersofthebibledidyouread.$t.replace(/\D/g, ''));
        entry.running = strToInt(rows[row].gsx$howmanyminutesdidyourun.$t.replace(/\D/g, ''));

        if (entry.timestamp !== '' && (entry.pages !== 0 || entry.chapters !== 0 || entry.running !== 0)) {
          jsonData.push(entry);
        }
      }
      this.soulfitData = jsonData;
      return jsonData;
  };

  this.filterByName = function(name, soulfitData) {
    var sfd = soulfitData || this.soulfitData;
    var jsonData = [];
    this.totalPages = 0;
    this.totalChapters = 0;
    this.totalRunning = 0;

    for(var i in sfd) {
      if(sfd[i].name === name || name === '') {
        this.totalPages += sfd[i].pages;
        this.totalChapters += sfd[i].chapters;
        this.totalRunning += sfd[i].running;
        jsonData.push(sfd[i]);
      }
    }

    this.soulfitData = jsonData;
    this.generateChartistData(jsonData);
    return jsonData;
  };

  this.generateChartistData = function(soulfitData) {
    var SeriesObj = function(name) {
      this.name = name;
      this.data = [];
    };

    var sfd = soulfitData || this.soulfitData;
    var labels = [];
    var series = [ new SeriesObj('pages'),
                   new SeriesObj('chapters'),
                   new SeriesObj('running') ];
    var timeLabels = [];
    var timeSeries = [ new SeriesObj('pages'),
                   new SeriesObj('chapters'),
                   new SeriesObj('running') ];

    // Reset total running / total pages
    this.totalPages = 0;
    this.totalRunning = 0;

    for(var i in sfd) {
      var j = isInArray(labels, sfd[i].name);
      if(j) {
        series[0].data[j] += sfd[j].pages;
        series[1].data[j] += sfd[j].chapters;
        series[2].data[j] += sfd[j].running;
      }
      else { // New name;
        labels.push(sfd[i].name);
        series[0].data.push(sfd[i].pages);
        series[1].data.push(sfd[i].chapters);
        series[2].data.push(sfd[i].running);
      }
      this.totalPages += sfd[i].pages;
      this.totalRunning += sfd[i].running;
      timeLabels.push(sfd[i].timestamp.split(' ')[0]);
      timeSeries[0].data.push(sfd[i].pages);
      timeSeries[1].data.push(sfd[i].chapters);
      timeSeries[2].data.push(sfd[i].running);
    }

    this.ctData = { 'labels': labels, 'series': series };
    this.ctTimeData = { 'labels': timeLabels, 'series': timeSeries };
  };
};

new SoulfitFactory();
