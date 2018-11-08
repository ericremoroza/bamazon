//Packages needed
var mysql = require("mysql");
var inquirer = require("inquirer");

//Create connection for SQL database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    displayInventory();
});

//no negative integers
function validateInput(value) {
    var integer = Number.isInteger(parseFloat(value));
    var sign = Math.sign(value);

    if (integer && (sign === 1)) {
        return true;
    } else {
        return "You need an integer greater than zero.";
    }
}


// function asking what product the customer would like and how many of it
function start() {
    inquirer
        .prompt([
            {
                name: "action",
                type: "id",
                message: "Welcome to Bamazon! What is the id of the product you want to buy?",
                validate: validateInput,
                filter: Number
            }, {
                name: "action",
                type: "stock_quantity",
                message: "How many units would you like to buy?",
                validate: validateInput,
                filter: Number
            }
        ]).then(function (userInput) {
            var item = userInput.item_id;
            var quantity = userInput.stock_quantity;
            var queryStr = 'SELECT * FROM products WHERE ?';

            connection.query(queryStr, { item_id: item }, function (err, data) {
                if (err) throw err;

                //item id must not equal zero
                if (data.length === 0) {
                    console.log("What else would you like to buy?");
                    displayInventory();
                } else {
                    var productInfo = data[0];
                    if (quantity <= productInfo.stock_quantity) {
                        console.log("Hooray! We have your requested item in our inventory!! Placing order!");
                        //subtract stock quantity
                        var newQueryStr = "UPDATE products SET stock_quantity = " + (productInfo.stock_quantity - quantity) + "WHERE item_id = " + item;

                        connection.query(newQueryStr, function (err, data) {
                            if (err) throw err;

                            console.log("Order placed! You will be billed $" + productInfo.price * quantity);
                            console.log("Thanks for shopping with Bamazon! Please come again!");
                            connection.end();
                        })
                    } else {
                        console.log("Not enough product in stock.");
                    }
                }
            })
        })
};

function displayInventory() {
    // Construct the db query string
    queryStr = 'SELECT * FROM products';

    // Make the db query
    connection.query(queryStr, function (err, data) {
        if (err) throw err;

        console.log('Existing Inventory: ');

        var strOut = '';
        for (var i = 0; i < data.length; i++) {
            strOut = '';
            strOut += 'Item ID: ' + data[i].item_id + ' | ';
            strOut += 'Product Name: ' + data[i].product_name + ' | ';
            strOut += 'Department: ' + data[i].department_name + ' | ';
            strOut += 'Price: $' + data[i].price + '\n';

            console.log(strOut);
        }



        //Prompt the user for item/quantity they would like to purchase
        start();
    })
}

function activate() {
    start();
}

