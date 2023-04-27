# Hasardeux Press
Full-Stack Javascript Web App for creating custom artwork design templates and staging the images for upload to print-on-demand marketplaces.

![alt text](https://github.com/mccartymv/hasardeux-press/blob/main/src/assets/images/top_banner.jpg?raw=true)
![alt text](https://github.com/mccartymv/hasardeux-press/blob/main/src/assets/images/mid_banner.jpg?raw=true)
![alt text](https://github.com/mccartymv/hasardeux-press/blob/main/src/assets/images/bottom_banner.jpg?raw=true)

# Running The Project

A running [MongoDB database deployment](https://www.mongodb.com/atlas/database) is required to use this project. Set one up and enter the database url to the `dbUrl` field in `config.json`.

To run the front end in development mode: 
- `git clone` this repository
- `cd hasardeux-press` to enter the project directory
- run `ng serve` to serve the project

To run the Node.js backend:
- run `node server/server.js` from the project directory in another console window

The project should be running now on `localhost:4200` and can be accessed from your web browser

# Project User Stories
- As an Artist User, I would like to be able to save large lists that I find online so that I can use them in my artwork.
- As an Artist User, I would like to be able to manage the lists manually, so that I can edit some items, remove unwanted items or add new items as well.
- As an Artist User, I would like to be able to create new templates and edit them in the browser with HTML5 canvas rules and a live preview.
- As an Artist User, I would like a button which will save a PNG image of the currently rendered artwork to the 'stage' folder in the project directory, so that I can easily and quickly upload many designs to a print-on-demand site.

# List Management
Once a list of items is scraped from the web, it will appear in the Lists Tab.
![alt text](https://github.com/mccartymv/hasardeux-press/blob/main/src/assets/images/home.png?raw=true)<br><br>

Clicking the "Manage Lists" button lets us browse the entire list with all data associated with each item 
![alt text](https://github.com/mccartymv/hasardeux-press/blob/main/src/assets/images/list-browse.png?raw=true)<br><br>

We can edit lists and individual list items here. Also we can cull unwanted items or add new items to the list easily from this page
![alt text](https://github.com/mccartymv/hasardeux-press/blob/main/src/assets/images/list-edit.png?raw=true)<br><br>



# Custom Javascript Templates
![alt text](https://github.com/mccartymv/hasardeux-press/blob/main/src/assets/images/live-code-edit-screen.png?raw=true)
The above screenshot shows the template editing/artwork upload page. Here the user can edit the template javascript code in the browser and see the live rendering, while cycling through list items to see how each one might look in the template. A switch to toggle the rendering is necessary, as it prevents incomplete code from crashing the browser.<br><br>
Clicking "Copy Canvas Image to Stage File" will send an image buffer of the current canvas rendering to the server, where it will be saved as a PNG image to the `stage` directory. The user is now free to upload this image to an artwork upload form on a print-on-demand site. They can then repeat the process for every artwork rendered by the list.


<br><br>
![alt text](https://github.com/mccartymv/hasardeux-press/blob/main/src/assets/images/artwork-example-2.png?raw=true)
The design above was rendered on an HTML5 Canvas with the Javascript code below, which was written entirely in the browser:
```
var canvas = document.getElementById("pane");
var context = canvas.getContext("2d");
context.fillStyle = "black";

var listItem = "{{ listItem }}";
context.scale(1, 1.5);
context.clearRect(0, 0, canvas.width, canvas.height);

context.fillStyle = "yellow";
context.textAlign = "center";
context.textBaseline = "top";
var textX = (canvas.width/2);

// context.font = "italic 600px Onyx";
var largestFontSize = 0;
for (var k=150;k<1500;++k) {
	context.font = "italic " + k + "px Onyx";
    var textWidth = context.measureText("100% " + listItem.toUpperCase()).width;
    if (textWidth < (canvas.width - 250)) {
        largestFontSize = k;
    }
}
if (largestFontSize>=1000) {
	var spacesWidth = context.measureText(" ").width*0.65;
} else {
	var spacesWidth = context.measureText(" ").width/3;
}
context.font = "italic " + largestFontSize + "px Onyx";
context.fillText("100% " + listItem.toUpperCase(), textX-spacesWidth, 75 + ((listItem.length+4)));
context.setTransform(1, 0, 0, 1, 0, 0);

```

<br><br>
![alt text](https://github.com/mccartymv/hasardeux-press/blob/main/src/assets/images/artwork-example-3.png?raw=true)<br>
Another design rendered with browser code:
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
    }
}

for (k=0;k<text.length;++k) {
    context.fillStyle = inkColor;
    context.fillRect(45, (250+(k*85))-75, longestLine + 30, 96);
    context.fillStyle = bgColor;
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

