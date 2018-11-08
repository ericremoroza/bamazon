DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50),
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER(100) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Queen Collection", "Music", 99.99, 10), 
    ("Grilling Machine", "Cooking", 101.88, 12), 
    ("Wonder Woman 1/6 Scale", "Toys and Games", 186.99, 3),
    ("Fats Domino: The Definitive Collection", "Music", 49.99, 250),
    ("Dormammu Toboggan", "Sports", 129.87, 100),
    ("Deadpool or no Deadpool: The Board Game", "Toys and Games", 10.23, 76),
    ("Stills", "Books", 9.95, 100);
    