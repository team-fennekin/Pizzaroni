-- To Update Schema:
-- mysql -u root < mysql/schema.sql

DROP DATABASE IF EXISTS pizzeria;

CREATE DATABASE pizzeria;

USE pizzeria;

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  username VARCHAR (20) UNIQUE,
  password VARCHAR (2000),
  first_name VARCHAR(20),
  last_name VARCHAR(50),
  email VARCHAR(20),
  phone_number VARCHAR(20),
  address_id int,
  PRIMARY KEY (ID)
);

CREATE TABLE addresses (
  id int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  street_number VARCHAR(20) NOT NULL,
  street_name VARCHAR(20) NOT NULL,
  apt_number VARCHAR(20) NOT NULL,
  city VARCHAR(20) DEFAULT NULL,
  state VARCHAR(20) DEFAULT NULL,
  zip_code int NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE billing (
  id int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  card_id VARCHAR(20) NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE cards (
  id int NOT NULL AUTO_INCREMENT,
  card_name VARCHAR(20) DEFAULT NULL,
  user_id int NOT NULL,
  card_number VARCHAR(20) NOT NULL,
  CCV VARCHAR(10) DEFAULT NULL,
  expiration Date NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE users_pizzas (
  id int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  pizza_id int NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE pizzas (
  id int NOT NULL AUTO_INCREMENT,
  size_id int NOT NULL,
  crust_id int NOT NULL,
  price int NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE favorites (
  id int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  pizza_id int NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE pizza_toppings (
  id int NOT NULL AUTO_INCREMENT,
  pizza_id int NOT NULL,
  side_id int NOT NULL,
  topping_id int NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE sizes (
  id int NOT NULL AUTO_INCREMENT,
  name VARCHAR(20) NOT NULL,
  price FLOAT NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE toppings (
  id int NOT NULL AUTO_INCREMENT,
  name VARCHAR(20) NOT NULL,
  price FLOAT NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE crusts (
  id int NOT NULL AUTO_INCREMENT,
  name VARCHAR(20) NOT NULL,
  price int NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE orders (
  id int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  pizza_id int NOT NULL,
  date Date NOT NULL,
  price int NOT NULL,
  PRIMARY KEY (ID)
);

-- TOPPINGS
INSERT INTO toppings(name, price) VALUES ('pepperoni', 2), ('mushrooms', 1.5), ('jalapenos', 1), ('bell peppers', 1.25), ('green peppers', 1.25), ('onions', 0.75), ('sausage', 0.75), ('bacon', 5.75), ('extra cheese', 1.75), ('black olives', 2.25), ('pineapple', 4.50), ('spinach', 1.15);

-- SIZES
INSERT INTO sizes(name, price) VALUES ('Small', 9.99), ('Medium', 16.99), ('Large', 22.99), ('eXtra Large', 31.99);

-- CRUSTS
INSERT INTO crusts(name, price) VALUES ('Thin Crust', 1.99), ('Thick Crust', 2.99), ('Pan Crust', 3.99), ('Deep Crust', 4.99), ('Cheese Filled Crust', 5.99), ('Stuffed Filled Crust', 6.99);

-- USERS
INSERT INTO users(first_name, last_name, email, phone_number) VALUES ('Misulechka', 'Grand ArchMage of Flames', 'rofl@gmail.com', '123 (456) 7890'), ('Gil', 'Kwak', 'rofl@gmail.com', '123 (456) 7890'), ('Ilya', 'Yanchuk', 'rofl@gmail.com', '123 (456) 7890'), ('Suhail', 'Ansari', 'rofl@gmail.com', '123 (456) 7890');
