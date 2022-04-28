var request = require('request');
var cheerio = require('cheerio');
var _ = require('underscore');
var mongoose = require('mongoose');

var sw = require('stopword');

var dbUrl = "mongodb://clerk97:M53147SR@ds359847.mlab.com:59847/hasardeux-press"

var options = { keepAlive: 300000, connectTimeoutMS: 30000, 
                useNewUrlParser: true };       
  
mongoose.connect(dbUrl, options);
var conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));  
 
conn.once('open', function() {
    console.log("Connected to MongoDB...");
    var listSchema = mongoose.Schema({
        _id: Object,
        name: String,
        dateCreated: String,
        contents: Array,
        scrapes: Array,
        products: Array
    }, {collection : 'product-data'});
    var List = mongoose.model('Product-Data', listSchema);


    setInterval(tagScrape, 934000);
    tagScrape();

    function tagScrape() {

        List.findOne({ "_id": mongoose.Types.ObjectId("5d7c0b2fb820dd188326977b") }).exec(function(err, doc) {
            if (err) {
                console.log("Error: " + err);
            }


            var scrapeItem = _.find(_.shuffle(doc.contents), function(item) {
                return item.hasOwnProperty('tags') == false
            });
            
            var options = {
                method: 'GET',
                url: encodeURI(scrapeItem.href),
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

                var rawText = $('body').find("div.Job-desc-table-mobile").find('p').first().text();

                $('body').find('div.centercontentcolumn p').each(function() {

                    var firstChar = $(this).text().charAt(0);

                    if (firstChar >= '0' && firstChar <= '9' && firstChar !== "2") {

                        rawText += $(this).text() + "\n\n";

                    }
                });
                //console.log(rawText);
                var wordsArray = splitByWords(rawText);
                var wordsMap = createWordMap(wordsArray);
                var finalWordsArray = _.filter(sortByCount(wordsMap), function(word) {
                    return word.total > 1
                });

                tagsArray.push(scrapeItem.name);
                _.each(finalWordsArray, function(word, index) {
                    if (index < 16) {
                        tagsArray.push(word.name);
                    }
                });

                _.each(doc.contents, function(job) {
                    if (job.href === scrapeItem.href && job.id !== scrapeItem.id) {
                        console.log("duplicate href found...");
                        job.tags = tagsArray;
                        job.tags.push(job.name);
                        job.hasBeenTagged = true;
                    }
                });

                scrapeItem.tags = tagsArray;
                scrapeItem.hasBeenTagged = true;

                console.log(tagsArray);
                List.updateOne({ "_id": mongoose.Types.ObjectId("5d7c0b2fb820dd188326977b") }, { '$set' : { "contents" : doc.contents } }, function(err) {
                    if (err) {
                        console.log(err);
                    }

                    console.log("updated with new tags");

                });

            });

        });

    }
});


function splitByWords (text) {
    // split string by spaces (including spaces, tabs, and newlines)
    var wordsArray = text.split(/\s+/);
    var newString = sw.removeStopwords(wordsArray);
    return newString;
  }
  
  
  function createWordMap (wordsArray) {
  
    // create map for word counts
    var wordsMap = {};
    /*
      wordsMap = {
        'Oh': 2,
        'Feelin': 1,
        ...
      }
    */
    wordsArray.forEach(function (key) {
      if (wordsMap.hasOwnProperty(key)) {
        wordsMap[key]++;
      } else {
        wordsMap[key] = 1;
      }
    });
  
    return wordsMap;
  
  }
  
  
  function sortByCount (wordsMap) {
  
    // sort by count in descending order
    var finalWordsArray = [];
    finalWordsArray = Object.keys(wordsMap).map(function(key) {
      return {
        name: key,
        total: wordsMap[key]
      };
    });
  
    finalWordsArray.sort(function(a, b) {
      return b.total - a.total;
    });
  
    return finalWordsArray;
  
  }
