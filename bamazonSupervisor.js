var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("easy-table");

// Connection credentials
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon"
})
connection.connect(function (err) {
    if (err) throw err
    initializeScreen();
})

function initializeScreen(){
    inquirer
    .prompt(
        {
            type: "list",
            choices: ["View Product Sales by Department","Create New Department"],
        }
    )
}