exports.myScrape = function(scrapeUrl) {
    var request = require('request');
    var cheerio = require('cheerio');
    var _ = require('underscore');

    var rforeign = /[^\u0000-\u007f]/;

    return new Promise((resolve, reject) => {

        var options = {
            method: 'GET',
            url: scrapeUrl,
            json: true,
            headers: {
                'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:68.0) Gecko/20100101 Firefox/68.0',
                'Connection': 'keep-alive',
                'Accept-Encoding': '',
                'Accept-Language': 'en-US,en;q=0.8'
            }
        };
    
        var resultsArray = [];

        request(options, function(err, response, html) {
            if (err) {
                console.log("error: " + err);
            }
            
            var $ = cheerio.load(html);
            
            var arrayLength = $('body').find('table.mbgen tr').length;

            $('body').find('table.mbgen tr').each(function(index) {
        
                var newItem = {};

                newItem['name'] = $(this).find("a.artist").first().text().trim();
                newItem['id'] = $(this).find("a.artist").attr("title");
                newItem['href'] = "https://rateyourmusic.com" + $(this).find("a.artist").attr("href");

        
                newItem['tags'] = [];
                newItem['tagMethod'] = "targetUrlScrape";
                newItem['hasBeenTagged'] = false;
        
                var redundant = _.find(resultsArray, function(obj) {
                    return obj['id'] === newItem['id']
                });

                if (newItem['name'] != "" && !rforeign.test(newItem['name']) && !redundant) {
                    resultsArray.push(newItem);
                }
                
            });

            //console.log(resultsArray);
            resolve(resultsArray);
        
        });

    });
    
}