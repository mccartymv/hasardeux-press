# hasardeux-press
Full-Stack Javascript Web App for creating custom artwork design templates and staging the images for upload to print-on-demand marketplaces.

![alt text](https://github.com/mccartymv/hasardeux-press/blob/main/src/assets/images/squarebiz_gallery2.png?raw=true)
![alt text](https://github.com/mccartymv/hasardeux-press/blob/main/src/assets/images/squarebiz_gallery.png?raw=true)
![alt text](https://github.com/mccartymv/hasardeux-press/blob/main/src/assets/images/mustbe_gallery.png?raw=true)

# Running The Project

A running [MongoDB database deployment](https://www.mongodb.com/atlas/database) is required to use this project. Set one up and enter the database url to the `dbUrl` field in `config.json`.

To run the front end in development mode: 
- `git clone` this repository
- `cd hasardeux-press` to enter the project directory
- run `ng serve` to serve the project

To run the Node.js backend:
- run `node server/server.js` from the project directory in another console window

The project should be running now on `localhost:4200` and can be accessed from your web browser

# Project Requirements
- As an Artist User, I would like to be able to save large lists that I find online so that I can use them in my artwork.
- As an Artist User, I would like to be able to manage the lists manually, so that I can edit some items, remove unwanted items or add new items as well.
- As an Artist User, I would like to be able to create new templates and edit them in the browser with HTML5 canvas rules and a live preview.
- As an Artist User, I would like a button which will save a single artwork to the project directory, so that I can easily and quickly upload many designs to a print-on-demand site.

# List Management


# Custom Javascript Templates









Here is the design code for this example:
```
var canvas = document.getElementById("pane");
var context = canvas.getContext("2d");

var listItem = "{{ listItem }}";
var text = stackText(listItem);

var bgColor = "black";
var inkColor = "white";

context.fillStyle = bgColor;
context.fillRect(0, 0, canvas.width, canvas.height);
context.fillStyle = inkColor;

context.setTransform(1.8, -0.3, 0, 1.7, 0, 120);
context.font = "50px Norwester";
context.fillText("Life's Better", 55, 90);
context.fillText("at the", 55, 150);
context.font = "80px Augustea";

var longestLine = 0;
for (k=0;k<text.length;++k) {
    if (longestLine < context.measureText(text[k].toUpperCase()).width) {
        longestLine = context.measureText(text[k].toUpperCase()).width;
    };
}

for (k=0;k<text.length;++k) {
    context.fillStyle = inkColor;
    context.fillRect(45, (250+(k*85))-75, longestLine + 30, 96);
    context.fillStyle = bgColor;
    // context.globalCompositeOperation = "destination-out";
    context.fillText(text[k].toUpperCase(), 60, (250+(k*85)));
    context.globalCompositeOperation = "source-over";
}

context.setTransform(1, 0, 0, 1, 0, 0);

function stackText(string) {
	var splitArray = string.replace(/ *\([^)]*\) */g, "").split(' ');
	
	if (splitArray.length === 2 && 
    	splitArray[0].length < 9 && 
        splitArray[1].length < 9) {
    	splitArray[0] = splitArray[0] + " " + splitArray[1];
		splitArray.length = 1;
	}

    if (splitArray.length >= 3) {
    
    	var stacks = [];
        
    	for (var k=2;k<=splitArray.length;++k) {
        	
        	var textStacks = partitions(splitArray, k);
        	for (var j=0;j<textStacks.length;++j) {
            	stacks.push({
                	'array' : textStacks[j],
                    'waste' : countWaste(textStacks[j])                
                });
            }
        }
        
        stacks.sort(function (stack1, stack2) {

            // Sort by waste
            if (stack1.waste < stack2.waste) return -1;
            if (stack1.waste > stack2.waste) return 1;

            if (stack1.array.length > stack2.array.length) return 1;
            if (stack1.array.length < stack2.array.length) return -1;

        });

		splitArray = stacks[0].array;

	}



    return splitArray
}

function partitions(arr, length) {
  if (length === arr.length) return [arr]; // shortcut
  if (length === 1) return [[arr.join(" ")]]; // base case
  let results = [];
  for (let firstlen = arr.length - length + 1; firstlen > 0; firstlen--) {
    let prefix = arr.slice(0, firstlen).join(" ");
    results.push(...partitions(arr.slice(firstlen), length - 1)
                    .map(result => [prefix, ...result]));
  }
  return results;
}

function countWaste(arr) {
	var longestString = 0;
    for (var k=0;k<arr.length;++k) {
    	if (arr[k].length>longestString) {
        	longestString = arr[k].length;
        }
    }
    var waste = 0;
    for (var k=0;k<arr.length;++k) {
		waste = waste + (longestString - arr[k].length);
	}
    return waste

}

```

