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

// function asking what product the customer would like and how many of it
function start() {
    inquirer
        .prompt([
            {
                name: "action",
                type: "id",
                message: "Welcome to Bamazon! What is the id of the product you want to buy?"
            }, {
                name: "action",
                type: "stock_quantity",
                message: "How many units would you like to buy?"
            }
        ]).then(function(userInput){
            var item = userInput.item_id;
            console.log("Thank you! Your order of " + item + " has been shipped!");
        })
};

function displayInventory() {
	// Construct the db query string
	queryStr = 'SELECT * FROM products';

	// Make the db query
	connection.query(queryStr, function(err, data) {
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