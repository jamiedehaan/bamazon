var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    displayProducts();
});

function displayProducts() {
    console.log("\nShopping for electronics? Check out these awesome products!");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        res.forEach(function (product) {
            console.log("\n" + product.product_name + " (Product ID: " + product.item_id + "), $" + product.price);
        });
        promptUser();
    });
};

function promptUser() {
    inquirer.prompt([
        {
            message: "\n" + "What is the ID of the product you would like to purchase?",
            type: "input",
            name: "id",
            validate: function (value) {
                if (isNaN(value) == false) {
                    return true;
                } else {
                    return false;
                };
            }
        },
        {
            message: "\n" + "What is your desired quantity?",
            type: "input",
            name: "quantity",
            validate: function (value) {
                if (isNaN(value) == false) {
                    return true;
                } else {
                    return false;
                };
            }
        }
    ])
        .then(function (response) {
            connection.query("SELECT * FROM products WHERE item_id=" + response.id, function (err, res) {
                if (err) throw err;

                var inventory = res[0].stock_quantity;
                var payment = res[0].price;

                if (response.quantity > inventory) {
                    console.log("\nSorry, insufficient quantity!");
                    console.log("\n****************************");
                    displayProducts();

                } else {
                    var quantity = inventory - response.quantity;
                    connection.query("UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: quantity
                            },
                            {
                                item_id: response.id
                            }
                        ], function (err, res) {
                            if (err) throw err;
                            var cost = response.quantity * payment;
                            console.log("\nYour total is $" + cost + "!");
                            console.log("\n****************************");
                            displayProducts();
                        });
                };
            });
        });
};