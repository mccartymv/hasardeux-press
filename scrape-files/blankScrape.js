var request = require('request');
var cheerio = require('cheerio');
var _ = require('underscore');

var resultsArray = [];

var options = {
    method: 'GET',
    url: scrapeUrl,
    json: true,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0',
        'Connection': 'keep-alive',
        'Accept-Encoding': '',
        'Accept-Language': 'en-US,en;q=0.8'
    }
};

request(options, function(err, response, html) {
  if (err) {
  console.log("error: " + err);
  }
    
	var $ = cheerio.load(html);

  $('body').find('').each(function(index) {

    var newItem = {};

    /**
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     */

    if (true) {

    } else {
      resultsArray.push(newItem);
    }

  });

});
