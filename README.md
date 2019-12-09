# Bamazon

# Problem
Attempting to run an e-commerce application/website and have to complete all of the transactions manually? This Bamazon app has all of the functionality of what you would need for such a business. From a user point-of-view to a manager, to even a supervisor, this application handles all of your needs to grab, visualize and manipulate data in a database (specifically from an e-commerce standpoint).

# Overview
For this application, we took the general skeleton for how a website/app like Amazon functions, and used it to create our own "storefront" under the name ***Bamazon***. From the customer's POV, the app will take in orders from users and deplete stock from the store's inventory. Additional functionality include tracking product sales across store departments and providing summary of the highest-grossing items and departments.

# Instructions
### Customer.js

### Manager.js

### Supervisor.js

## Technology
The [mysql npm package](https://www.npmjs.com/package/mysql) was used to parse through the database and manipulate and grab the data to be presented to the user.

The [easy-table npm package](https://www.npmjs.com/package/easy-table) was used to present this data in a clear viewing window for the user to visualize and execute functions on.

These functions were executed with the help of the [inquirer npm package](https://www.npmjs.com/package/inquirer), which presents users with questions to be answered in the terminal window. Based on how the user answers these questions, certain functions will be executed (in this case, on the data).

## Role
Lead Developer