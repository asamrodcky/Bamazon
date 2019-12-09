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

function initializeScreen() {
    console.log("This is running")
    var query = "SELECT * from products"
    var items = []
    connection.query(query, function (err, res) {
        if (err) throw err;
        // console.log(res)
        for (var i = 0; i < res.length; i++) {
            items.push(res[i].product_name)
        };
        // items.push("Exit")
        var t = new Table;

        res.forEach(function (product) {
            t.cell('Item ID', product.item_id)
            t.cell('Product Name', product.product_name)
            t.cell('Price, USD', product.price, Table.number(2))
            t.cell('Stock Quantity', product.stock_quantity)
            t.newRow()
        });

        console.log(t.toString());
        whatToBuy(items);
    })
}

var itemInQuestion = "";
var quantityInQuestion = 0;
var newQuantity = 0;

function whatToBuy(items) {
    var query = "SELECT * from products"
    connection.query(query, function (err, res) {
        if (err) throw err;
        inquirer
        .prompt([
            {
                type: "list",
                message: "What item would you like to purchase?",
                choices: items,
                name: "itemToBuy"
            },
            {
                type: "input",
                message: "How many of this item would you like to purchase?",
                name: "quantity",
                validate: function (value) {
                    !isNaN(value);
                    return true;
                }
            }
        ])
        .then(function (response) {
            itemInQuestion = response.itemToBuy
            quantityInQuestion = response.quantity
            // console.log(itemInQuestion)
            // console.log(quantityInQuestion)
            // console.log(res)
            for (var i = 0; i < res.length; i++) {
                // console.log(res[i]);
                if(res[i].product_name === itemInQuestion && res[i].stock_quantity > quantityInQuestion){
                    newQuantity = res[i].stock_quantity - quantityInQuestion;
                    console.log(newQuantity);
                    updateProduct(newQuantity, itemInQuestion);
                }
                else if(res[i].product_name === itemInQuestion && res[i].stock_quantity < quantityInQuestion){
                    console.log("Insufficient quantity!")
                }
            };
            // if(response.itemToBuy === "Exit"){
            //     connection.end();
            // }
            
            initializeScreen();

        })
    })
}

function createProduct() {
    console.log("Inserting a new product...\n");
    var query = connection.query(
        "INSERT INTO products SET ?",
        {
            flavor: "Rocky Road",
            price: 3.0,
            quantity: 50
        },
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " product inserted!\n");
            // Call updateProduct AFTER the INSERT completes
        }
    );

    // logs the actual query being run
    console.log(query.sql);
}

function updateProduct(val, loc) {
    console.log("Updating all" + loc + "quantities...\n");
    query = "UPDATE products SET ? WHERE ?"
    query = connection.query(query,[{stock_quantity: val},{product_name: loc}],
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " products updated!\n");
        }
    );

    // logs the actual query being run
    console.log(query.sql);
}

function deleteProduct() {
    console.log("Deleting all strawberry icecream...\n");
    connection.query(
        "DELETE FROM products WHERE ?",
        {
            flavor: "strawberry"
        },
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " products deleted!\n");
            // Call readProducts AFTER the DELETE completes
            readProducts();
        }
    );
}

function readProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(res);
        connection.end();
    });
}
