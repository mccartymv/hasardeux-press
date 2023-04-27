# Hasardeux Press

Hasardeux Press is a full-stack JavaScript web application that enables artists to create custom artwork design templates and stage images for upload to print-on-demand marketplaces.

![Top Banner](https://github.com/mccartymv/hasardeux-press/blob/main/src/assets/images/top_banner.jpg?raw=true)
![Mid Banner](https://github.com/mccartymv/hasardeux-press/blob/main/src/assets/images/mid_banner.jpg?raw=true)
![Bottom Banner](https://github.com/mccartymv/hasardeux-press/blob/main/src/assets/images/bottom_banner.jpg?raw=true)

## Prerequisites

A running [MongoDB database deployment](https://www.mongodb.com/atlas/database) is required to use this project. Set one up and enter the database URL in the `dbUrl` field in `config.json`.

## Getting Started

1. Clone this repository: `git clone https://github.com/mccartymv/hasardeux-press.git`
2. Navigate to the project directory: `cd hasardeux-press`
3. Install the required dependencies: `npm install`
4. Run the front end in development mode: `ng serve`
5. In a separate console window, run the Node.js backend: `node server/server.js`

The project should now be running on `localhost:4200` and can be accessed from your web browser.

## Features

### Project User Stories

- As an Artist User, I want to save large lists found online for use in my artwork.
- As an Artist User, I want to manage the lists manually to edit, remove, or add items.
- As an Artist User, I want to create and edit templates in the browser using HTML5 canvas rules and a live preview.
- As an Artist User, I want a button to save a PNG image of the currently rendered artwork to the 'stage' folder in the project directory for easy upload to print-on-demand sites.

### List Management
Once a list of items is scraped from the web, it will appear in the Lists Tab.
![alt text](https://github.com/mccartymv/hasardeux-press/blob/main/src/assets/images/home.png?raw=true)<br><br>

Clicking the "Manage Lists" button lets us browse the entire list with all data associated with each item 
![alt text](https://github.com/mccartymv/hasardeux-press/blob/main/src/assets/images/list-browse.png?raw=true)<br><br>

We can edit lists and individual list items here. Also we can cull unwanted items or add new items to the list easily from this page
![alt text](https://github.com/mccartymv/hasardeux-press/blob/main/src/assets/images/list-edit.png?raw=true)<br><br>



### Custom Javascript Templates
![alt text](https://github.com/mccartymv/hasardeux-press/blob/main/src/assets/images/live-code-edit-screen.png?raw=true)<br>
The screenshot above displays the template editing and artwork upload page. Users can conveniently modify the template JavaScript code directly in the browser, with a live rendering to preview how each list item appears in the design. To prevent incomplete code from crashing the browser, a switch is available to toggle the rendering on and off.<br><br>

By clicking "Copy Canvas Image to Stage File," users send an image buffer of the current canvas rendering to the server, where it is saved as a PNG image in the stage directory. This enables users to easily upload the image to an artwork upload form on a print-on-demand site. The process can be repeated for every artwork generated from the list.


<br>
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

