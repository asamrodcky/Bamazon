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

var items = []

function initializeScreen(){
    var query = "SELECT * from products"
    items;
    connection.query(query, function (err, res) {
        if (err) throw err;
        // console.log(res)
        for (var i = 0; i < res.length; i++) {
            items.push(res[i].product_name)
        };
        inquirer
        .prompt(
            {
                type: "list",
                message: "What would you like to do?",
                choices: ["View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product",
                "Exit"],
                name: "initialFunction"
            }
        )
        .then(function(response){
            switch(response.initialFunction){
                case "View Products for Sale":
                    viewProducts();
                    break;
                case "View Low Inventory":
                    viewLowInventory();
                    break;
                case "Add to Inventory":
                    addInventory(items);
                    break;
                case "Add New Product":
                    addNewProduct();
                    break;
                case "Exit":
                    connection.end();
                    break;
            }
        })
    })
}

function viewProducts(){
    var query = "SELECT * from products"
    var items = []
    connection.query(query, function (err, res) {
        if (err) throw err;
        // console.log(res)
        for (var i = 0; i < res.length; i++) {
            items.push(res[i].product_name)
        };
        var t = new Table;

        res.forEach(function (product) {
            t.cell('Item ID', product.item_id)
            t.cell('Product Name', product.product_name)
            t.cell('Price, USD', product.price, Table.number(2))
            t.cell('Stock Quantity', product.stock_quantity)
            t.newRow()
        });

        console.log(t.toString());
        initializeScreen();
    })
};

function viewLowInventory(){
    var lowInvItems = [];
    connection.query("SELECT * from products WHERE stock_quantity < 5", function(err,res){
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            lowInvItems.push(res[i].product_name)
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
        initializeScreen();
    })
};

var itemInQuestion = "";

function addInventory(items){
    var query = "SELECT * from products"
    connection.query(query, function (err, res) {
        if (err) throw err;
        // console.log(res)
        inquirer
        .prompt([
            {
                type: "list",
                message: "What item would you like to add inventory to?",
                choices: items,
                name: "itemToBuy"
            },
            {
                type: "input",
                message: "How many of this item would you like to add?",
                name: "quantity",
                validate: function (value) {
                    !isNaN(value);
                    return true;
                } 
            }
        ])
        .then(function (response) {
            itemInQuestion = response.itemToBuy;
            var quantityToAdd = response.quantity;
            var newQuantity = 0;
            for (var i = 0; i < res.length; i++) {
                // console.log(res[i]);
                if(res[i].product_name === itemInQuestion){
                    newQuantity = parseInt(res[i].stock_quantity) + parseInt(quantityToAdd);
                    updateProduct(newQuantity, itemInQuestion);
                }
            };
        })
    }); 
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
    initializeScreen();
}

function addNewProduct(){
    inquirer
    .prompt([
        {
            type: "input",
            message: "What product would you like to add to your inventory?",
            name: "productName"
        },
        {
            type: "input",
            message: "How much would you like for this product to cost?",
            name: "productPrice",
            validate: function (value) {
                !isNaN(value);
                return true;
            } 
        },
        {
            type: "input",
            message: "How much inventory would you like to add?",
            name: "productQuantity",
            validate: function (value) {
                !isNaN(value);
                return true;
            } 
        },
    ])
    .then(function(response){
        console.log("Inserting a new product...\n");
        var query = connection.query(
            "INSERT INTO products SET ?",
            {
                product_name: response.productName,
                price: response.productPrice,
                stock_quantity: response.productQuantity
            },
            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " product inserted!\n");
                // Call updateProduct AFTER the INSERT completes
            }
        );
    
        // logs the actual query being run
        console.log(query.sql);
        initializeScreen();
    })
}
