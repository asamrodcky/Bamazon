var mysql = require("mysql");
var inquirer = require("inquirer");

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
    runSearch();
})

function runSearch(){
    console.log("This is running")
    // inquirer
    //     .prompt([
    //         {

    //         }
    //     ])
    //     .then(function(response){

    //     })
}