exports.myTagScrape = function(scrapeUrl) {
    var request = require('request');
    var cheerio = require('cheerio');
    var _ = require('underscore');


    /**
     * 
     * Tags:
     *  artist name,
     *  city formed,
     *  first three genres if available,
     *  title of most-reviewed album
     * 
     *  overrides originally scraped artist name if different
     *  culls artist if condition:
     * 
     *  most reviewed album has under 400 reviews
     * 
     *  is met.
     * 
     * 
     */


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
    
        var tagsArray = [];

        request(options, function(err, response, html) {
            if (err) {
                console.log("error: " + err);
            }
            
            var $ = cheerio.load(html);

            // artist name
            var artistName = $('body').find('h1.artist_name_hdr').text();

            // city formed
            var locationString = $('body').find('a.location').text();
            var cityTag = locationString.split(",")[0];

            // first 3 genres
            $('body').find('.genre').each(function(index, element) {
                if (index < 3) {
                    tagsArray.push($(this).text().trim());
                }
            });


            var albumHighestRatingsCount = 0;
            var albumHighestName;
            $('body').find('div#disco_type_s').find('div.disco_release').each(function(el, index) {
                var albumRatings = Number($(this).find("div.disco_ratings").text().replace(',', ''));

                if (albumRatings > albumHighestRatingsCount) {
                    albumHighestRatingsCount = albumRatings;
                    albumHighestName = $(this).find("a.album").text();
                }

            });


            if (albumHighestRatingsCount > 400) {
                console.log("rymTagScrape successful for " + artistName);
                tagsArray.unshift(artistName, albumHighestName, cityTag);
                tagsArray.push("band", "music", "band shirt", "fan");
                resolve({ "tagArray" : tagsArray, "artistNameOverride" : artistName });
            } else if (albumHighestRatingsCount <= 400 && artistName !== '') {
                console.log("rymTagScrape candidate did not meet conditions, candidate for deletion - " + artistName);
                resolve("candidate for deletion");
            } else {
                console.log("scrape error...");
                resolve("error");
            }


        });


    });






};