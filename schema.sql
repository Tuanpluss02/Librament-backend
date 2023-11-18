-- Active: 1700270750053@@localhost@3306
CREATE DATABASE IF NOT EXISTS library_system;

USE library_system;

CREATE TABLE publishers (
    publisher_id VARCHAR(55) PRIMARY KEY NOT NULL,
    publisher_name VARCHAR(255) NOT NULL
);
CREATE TABLE books (
    book_id VARCHAR(55) PRIMARY KEY NOT NULL,
    publisher_id VARCHAR(55) NOT NULL,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    genre VARCHAR(255) NOT NULL,
    publication_year VARCHAR(10) NOT NULL,
    isbn VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (publisher_id) REFERENCES publishers(publisher_id)
);

CREATE TABLE borrowers (
    borrower_id VARCHAR(55) PRIMARY KEY NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL
);

CREATE TABLE borrowing_records (
    record_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    book_id VARCHAR(55) NOT NULL,
    borrower_id VARCHAR(55) NOT NULL,
    borrow_date DATE NOT NULL,
    return_date DATE NOT NULL,
    status ENUM('borrowed', 'returned', 'overdue', 'pending') NOT NULL,
    FOREIGN KEY (book_id) REFERENCES books(book_id),
    FOREIGN KEY (borrower_id) REFERENCES borrowers(borrower_id)
);

CREATE TABLE employees (
    employee_id VARCHAR(55) PRIMARY KEY NOT NULL,
    password VARCHAR(255) NOT NULL, 
    employee_name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL
);


INSERT INTO publishers VALUES ('PUB001', 'Penguin Random House');
INSERT INTO publishers VALUES ('PUB002', 'HarperCollins');
INSERT INTO publishers VALUES ('PUB003', 'Simon & Schuster');
INSERT INTO publishers VALUES ('PUB004', 'Hachette Livre');
INSERT INTO publishers VALUES ('PUB005', 'Macmillan Publishers');

INSERT INTO books VALUES ('B001', 'PUB001', 'The Great Gatsby', 'F. Scott Fitzgerald', 'Novel', '1925', '9780743273565', 5);
INSERT INTO books VALUES ('B002', 'PUB002', 'The Catcher in the Rye', 'J. D. Salinger', 'Novel', '1951', '9780316769174', 5);
INSERT INTO books VALUES ('B003', 'PUB003', 'The Grapes of Wrath', 'John Steinbeck', 'Novel', '1939', '9780143039433', 5);
INSERT INTO books VALUES ('B004', 'PUB004', 'To Kill a Mockingbird', 'Harper Lee', 'Novel', '1960', '9780446310789', 5);
INSERT INTO books VALUES ('B005', 'PUB002', 'The Color Purple', 'Alice Walker', 'Novel', '1982', '9780156028356', 5);
INSERT INTO books VALUES ('B006', 'PUB005', 'Beloved', 'Toni Morrison', 'Novel', '1987', '9781400033416', 5);


INSERT INTO borrowers VALUES ('BOR001', 'John Doe', '123 Main Street, New York, NY 10030', '212-555-1234');
INSERT INTO borrowers VALUES ('BOR002', 'Jane Doe', '123 Main Street, New York, NY 10030', '212-555-1234');
INSERT INTO borrowers VALUES ('BOR003', 'John Smith', '123 Main Street, New York, NY 10030', '212-555-1234');
INSERT INTO borrowers VALUES ('BOR004', 'Jane Smith', '123 Main Street, New York, NY 10030', '212-555-1234');
INSERT INTO borrowers VALUES ('BOR005', 'John Doe', '123 Main Street, New York, NY 10030', '212-555-1234');
