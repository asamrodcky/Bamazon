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
    runSearch();
})

function runSearch() {
    console.log("This is running")
    var query = "SELECT * from products"
    var items = []
    query = connection.query(query, function (err, res) {
        if (err) throw err;
        // console.log(res)
        for(var i = 0; i < res.length;i++){
            items.push(res[i].product_name)
        }
        console.log(items)
        var t = new Table

        res.forEach(function (product) {
            t.cell('Item ID', product.item_id)
            t.cell('Product Name', product.product_name)
            t.cell('Price, USD', product.price, Table.number(2))
            t.cell('Stock Quantity', product.stock_quanitity)
            t.newRow()
        })

        console.log(t.toString())
    })
    // inquirer
    //     .prompt([
    //         {
    //             type: "list",
    //             message: "What item would you like to buy",
    //             choices: [JSON.stringify(items.map())],
    //             name: "itemToBuy"
    //         }
    //     ])
    //     .then(function(response){
    //         console.log("This works?")
    //     })
}