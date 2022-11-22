CREATE DATABASE my_database;

-- \c into my_database

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255),
    fullname VARCHAR(255)
    createdAt Date,
    updatedAt Date
);

CREATE TABLE charts(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    value NUMBER(255),
    createdAt Date,
    updatedAt Date
)