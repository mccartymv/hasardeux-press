# hasardeux-press
Node.js back-end for custom artwork design templates and staging for upload to print-on-demand marketplaces.

![alt text](https://github.com/mccartymv/hasardeux-press/blob/main/src/assets/images/squarebiz_gallery2.png?raw=true)
![alt text](https://github.com/mccartymv/hasardeux-press/blob/main/src/assets/images/squarebiz_gallery.png?raw=true)
![alt text](https://github.com/mccartymv/hasardeux-press/blob/main/src/assets/images/mustbe_gallery.png?raw=true)

To start the server run
```
node server.js
```
# Endpoints
## GET /get-lists
  Retrives all lists and templates from database, sends to front end

## POST /scrape-list-items
  Server requests a website and scrapes data according to user submitted rules, sends data back to front end for inspection  

## POST /new-list
  User sends new list to server to be saved to database

## POST /save-product
  User edits or creates a new product design template to be saved to database

## POST /delete-product
  User deletes a design template from database

## POST /update-list
  User makes changes to a list to be saved to database

## POST /buffer-to-stage
  A design is generated following template rules from a single list item, saved as a PNG image to a specified folder in the project directory, is then considered staged for upload 
  

