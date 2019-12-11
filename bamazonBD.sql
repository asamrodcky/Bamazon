DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  price FLOAT(100,2) NULL,
  stock_quantity INT NULL,
  product_sales INT NULL,
  PRIMARY KEY (item_id)
);

CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(100) NULL,
  over_head_costs INT(100) NULL,
  PRIMARY KEY (department_id)
);

INSERT INTO products(product_name,price, stock_quantity)
VALUES("Ugly Christmas Sweater",40,10),
("Flamin' Hot Cheetos", 0.99, 1000),
("A Crunchy Leaf",2,50),
("Justin Bieber's used spoon",100,3),
("A left Airpod",20,1),
("Half-eaten Chicken Cutlet Sandwich",2,1),
("Sleeveless Hooded Sweatshirt",40, 50),
("A Single Nike Sock",5,100),
("Striped iPhone Charger",10,20),
("A Polaroid Camera w 1 count of film",500,75);

SELECT * FROM products;