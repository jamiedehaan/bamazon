DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon; 

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT, 
    product_name VARCHAR(50) NOT NULL, 
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(8, 2),
    stock_quantity INT,
    PRIMARY KEY(item_id)
);

INSERT INTO products 
    (product_name, department_name, price, stock_quantity)
VALUES 
    ("Apple TV 32GB", "Electronics", 149.00, 100),
    ("Beats Solo2 Wire On-Ear Headphone", "Electronics", 178.99, 100),
    ("Echo Dot", "Electronics", 49.99, 100),
    ("Echo Spot", "Electronics", 129.99, 100),
    ("Fire TV Cube", "Electronics", 119.99, 100),
    ("GoPro HERO5 Session", "Electronics", 199.00, 100),
    ("Kindle Paperwhite E-reader", "Electronics", 119.99, 100),
    ("Ring Wi-Fi Enabled Video Doorbell", "Electronics", 99.99, 100),
    ("Super Mario Party Nintendo", "Electronics", 59.99, 100),
    ("Xbox Wireless Controller", "Electronics", 46.99, 100);

SELECT * FROM products;