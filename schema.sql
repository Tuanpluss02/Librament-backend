-- Active: 1700270750053@@localhost@3306
CREATE DATABASE IF NOT EXISTS library_system;

USE library_system;

CREATE TABLE books (
    book_id VARCHAR(55) PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    genre VARCHAR(255) NOT NULL,
    publication_year INT NOT NULL,
    isbn VARCHAR(255) NOT NULL,
    quantity INT NOT NULL
);

CREATE TABLE borrowers (
    borrower_id VARCHAR(55) PRIMARY KEY NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL
);

CREATE TABLE borrowing_records (
    record_id VARCHAR(55) PRIMARY KEY NOT NULL,
    book_id VARCHAR(55) NOT NULL,
    borrower_id VARCHAR(55) NOT NULL,
    borrow_date DATE NOT NULL,
    return_date DATE NOT NULL,
    status VARCHAR(255) NOT NULL,
    FOREIGN KEY (book_id) REFERENCES books(book_id),
    FOREIGN KEY (borrower_id) REFERENCES borrowers(borrower_id)
);

CREATE TABLE employees (
    employee_id VARCHAR(55) PRIMARY KEY NOT NULL,
    employee_name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL
);

CREATE TABLE publishers (
    publisher_id VARCHAR(55) PRIMARY KEY NOT NULL,
    publisher_name VARCHAR(255) NOT NULL
);

CREATE TABLE users (
    user_id VARCHAR(55) PRIMARY KEY NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL
);