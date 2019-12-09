DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  price FLOAT(100,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

-- CREATE TABLE top3000Albums (
--   position INT NOT NULL,
--   artist VARCHAR(100) NULL,
--   album VARCHAR(100) NULL,
--   year INT NULL,
--   raw_total DECIMAL(10,4) NULL,
--   raw_usa DECIMAL(10,4) NULL,
--   raw_uk DECIMAL(10,4) NULL,
--   raw_eur DECIMAL(10,4) NULL,
--   raw_row DECIMAL(10,4) NULL,
--   PRIMARY KEY (position)
-- );

INSERT INTO products(product_name,price, stock_quanitity)
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