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
            console.log("\n" + product.product_name + " (Item ID: " + product.item_id + "), $" + product.price);
        });
        promptUser();
    });
    connection.end();
};

function promptUser() {
    inquirer.prompt([
        {
            message: "\n" + "What is the ID of the product you would like to purchase?",
            type: "input",
            name: "id"
        },
        {
            message: "\n" + "What is your desired quantity?",
            type: "input",
            name: "quantity"
        }
    ])
        .then(function (response) {
        })
}