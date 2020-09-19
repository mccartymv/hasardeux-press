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

    $('body').find('table.wikitable.sortable').each(function(index) {
        if (index == 1) {
            //console.log($(this).text());
            $(this).find("tr").each(function(index) {
                var animalObj = {};
                animalName = $(this).find("td").first().find("a").first().text();
                pageUrl = $(this).find("td").first().find("a").first().attr('href');
                if (animalName && animalName !== "Ass/donkey") {
                    animalObj['name'] = animalName;
                    animalObj['wikipediaUrl'] = pageUrl;
                    animalObj['id'] = "an-" + index;
                    //console.log(resultsArray);
                    resultsArray.push(animalObj);
                } else if (animalName && animalName == "Ass/donkey") {
                    animalObj['name'] = "Donkey";
                    animalObj['wikipediaUrl'] = pageUrl;
                    animalObj['id'] = "an-" + index;
                    resultsArray.push(animalObj);
                }
            });
        }




});



            //console.log(resultsArray);
            resolve(resultsArray);
        
        });

    });
    
}