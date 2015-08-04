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
    // Filter out data for just one individual person

    this.totalPages = 0;
    this.totalChapters = 0;
    this.totalRunning = 0;
    this.soulfitData = jsonData;
    this.generateChartistData(jsonData);
    return jsonData;
  };

  this.generateChartistData = function(soulfitData) {
    // Generate Data that works for Chartist;

    this.ctData = {};
    this.ctTimeData = {};
  };
};

new SoulfitFactory();
