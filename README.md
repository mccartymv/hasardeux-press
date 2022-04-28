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
- As an Artist User, I would like to be able to save large lists I find online so that I can use them in my artwork
- As an Artist User, I would like to be able to manage the lists manually, so that I can remove unwanted items from the lists and add new items as well
- As an Artist User, I would like to be able to create new templates and edit them in the browser with HTML5 canvas rules and a live preview
- As an Artist User, I would like a button which will save a single artwork to the project directory, so that I can easily upload the design to a print-on-demand site

