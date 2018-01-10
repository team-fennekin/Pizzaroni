CREATE DATABASE pizzeria;

USE pizzeria;

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(20) NOT NULL,
  last_name VARCHAR(20) NOT NULL,
  email VARCHAR(20) NOT NULL,
  phone_number VARCHAR(20) DEFAULT NULL,
  address_id int NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE addresses (
  id int NOT NULL,
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
  id int NOT NULL,
  user_id int NOT NULL,
  card_id VARCHAR(20) NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE cards (
  id int NOT NULL,
  card_name VARCHAR(20) DEFAULT NULL,
  user_id int NOT NULL,
  card_number VARCHAR(20) NOT NULL,
  CCV VARCHAR(10) DEFAULT NULL,
  expiration Date NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE pizza (
  id int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  size_id int NOT NULL,
  crust_id int NOT NULL,
  price int NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE favorites (
  id int NOT NULL,
  user_id int NOT NULL,
  pizza_id int NOT NULL
  PRIMARY KEY (ID)
);

CREATE TABLE pizza_toppings (
  id int NOT NULL,
  pizza_id int NOT NULL,
  topping_id int NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE sizes (
  id int NOT NULL,
  size_name VARCHAR(20) NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE toppings (
  id int NOT NULL,
  topping_name VARCHAR(20) NOT NULL,
  topping_price int NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE crusts (
  id int NOT NULL,
  crust_type VARCHAR(20) NOT NULL,
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
/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

INSERT INTO toppings(topping_name, topping_price) VALUES ('pepperoni', 2);
INSERT INTO toppings(topping_name, topping_price) VALUES ('mushrooms', 1.5);
INSERT INTO toppings(topping_name, topping_price) VALUES ('jalapenos', 1);
INSERT INTO toppings(topping_name, topping_price) VALUES ('bell peppers', 1.25);









