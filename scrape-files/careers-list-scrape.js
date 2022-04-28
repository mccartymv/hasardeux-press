exports.myScrape = function(scrapeUrl) {
    var request = require('request');
    var cheerio = require('cheerio');
    var _ = require('underscore');


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

            $('body').find('div.centercontentcolumn a').each(function(index) {
                var jobHref = $(this).attr('href');
                if (jobHref.substr(0,43) == "https://Job-Descriptions.CareerPlanner.com/") {
                    var jobObj = new Object;
                    jobObj['name'] = $(this).text();
                    jobObj['href'] = $(this).attr('href');
                    jobObj['id'] = "job-" + index;
                    resultsArray.push(jobObj);

                }

            });





            
            resolve(resultsArray);
        
        });

    });
    
}