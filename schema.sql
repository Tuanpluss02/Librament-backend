-- Active: 1700356960557@@localhost@3306
CREATE DATABASE IF NOT EXISTS library_system;

USE library_system;

CREATE TABLE publishers (
    publisher_id VARCHAR(55) PRIMARY KEY NOT NULL,
    publisher_name VARCHAR(255) NOT NULL
    address VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL
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
    record_id VARCHAR(55) PRIMARY KEY NOT NULL,
    book_id VARCHAR(55) NOT NULL,
    borrower_id VARCHAR(55) NOT NULL,
    employee_id VARCHAR(55) NOT NULL,
    borrow_date DATE NOT NULL,
    return_date DATE NOT NULL,
    status ENUM('borrowed', 'returned', 'overdue', 'pending') NOT NULL,
    FOREIGN KEY (book_id) REFERENCES books(book_id),
    FOREIGN KEY (borrower_id) REFERENCES borrowers(borrower_id),
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);

CREATE TABLE employees (
    employee_id VARCHAR(55) PRIMARY KEY NOT NULL,
    password VARCHAR(255) NOT NULL, 
    employee_name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL
);

CREATE TABLE code_table (
    code_id VARCHAR(55) PRIMARY KEY NOT NULL,
    code_number INT NOT NULL
);

INSERT INTO code_table VALUES ('BOR', 0);
INSERT INTO code_table VALUES ('EMP', 0);
INSERT INTO code_table VALUES ('REC', 0);
INSERT INTO code_table VALUES ('PUB', 0);
INSERT INTO code_table VALUES ('BOOK', 0);


INSERT INTO publishers VALUES ('PUB0001', 'Nhà xuất bản Kim Đồng', 'Hà Nội', '0123456789');
INSERT INTO publishers VALUES ('PUB0002', 'Nhà xuất bản Trẻ', 'Hà Nội', '0123456789');
INSERT INTO publishers VALUES ('PUB0003', 'Nhà xuất bản Văn học', 'Hà Nội', '0123456789');
INSERT INTO publishers VALUES ('PUB0004', 'Nhà xuất bản Hội Nhà văn', 'Hà Nội', '0123456789');
INSERT INTO publishers VALUES ('PUB0005', 'Nhà xuất bản Thanh Niên', 'Hà Nội', '0123456789');


INSERT INTO books VALUES ('BOOK0001', 'PUB0001', 'Bố Già', 'Mario Puzo', 'Tiểu thuyết', '1969', '978-604-77-1234-5', 10);
INSERT INTO books VALUES ('BOOK0002', 'PUB0001', 'Bố Già 2', 'Mario Puzo', 'Tiểu thuyết', '1969', '978-604-77-1234-5', 10);
INSERT INTO books VALUES ('BOOK0003', 'PUB0001', 'Bố Già 3', 'Mario Puzo', 'Tiểu thuyết', '1969', '978-604-77-1234-5', 10);
INSERT INTO books VALUES ('BOOK0004', 'PUB0001', 'Bố Già 4', 'Mario Puzo', 'Tiểu thuyết', '1969', '978-604-77-1234-5', 10);
INSERT INTO books VALUES ('BOOK0005', 'PUB0001', 'Bố Già 5', 'Mario Puzo', 'Tiểu thuyết', '1969', '978-604-77-1234-5', 10);


INSERT INTO books VALUES ('BOOK0006', 'PUB0002', 'Harry Potter và Hòn đá Phù thủy', 'J.K. Rowling', 'Tiểu thuyết', '1997', '978-604-77-1234-5', 10);
INSERT INTO books VALUES ('BOOK0007', 'PUB0002', 'Harry Potter và Phòng chứa Bí mật', 'J.K. Rowling', 'Tiểu thuyết', '1998', '978-604-77-1234-5', 10);
INSERT INTO books VALUES ('BOOK0008', 'PUB0002', 'Harry Potter và Tù nhân Azkaban', 'J.K. Rowling', 'Tiểu thuyết', '1999', '978-604-77-1234-5', 10);
INSERT INTO books VALUES ('BOOK0009', 'PUB0002', 'Harry Potter và Chiếc cốc lửa', 'J.K. Rowling', 'Tiểu thuyết', '2000', '978-604-77-1234-5', 10);


INSERT INTO books VALUES ('BOOK0010', 'PUB0003', 'Tôi thấy hoa vàng trên cỏ xanh', 'Nguyễn Nhật Ánh', 'Tiểu thuyết', '2000', '978-604-77-1234-5', 10);
INSERT INTO books VALUES ('BOOK0011', 'PUB0003', 'Cho tôi xin một vé đi tuổi thơ', 'Nguyễn Nhật Ánh', 'Tiểu thuyết', '2000', '978-604-77-1234-5', 10);

INSERT INTO books VALUES ('BOOK0012', 'PUB0004', 'Nhật ký Đặng Thùy Trâm', 'Đặng Thùy Trâm', 'Tiểu thuyết', '2005', '978-604-77-1234-5', 10);

INSERT INTO books VALUES ('BOOK0013', 'PUB0005', 'Nhật ký Đặng Thùy Trâm', 'Đặng Thùy Trâm', 'Tiểu thuyết', '2005', '978-604-77-1234-5', 10);


INSERT INTO borrowers VALUES ('BOR0001', 'Nguyễn Văn A', 'Hà Nội', '0123456789');
INSERT INTO borrowers VALUES ('BOR0002', 'Nguyễn Văn B', 'Hà Nội', '0123456789');
INSERT INTO borrowers VALUES ('BOR0003', 'Nguyễn Văn C', 'Hà Nội', '0123456789');
INSERT INTO borrowers VALUES ('BOR0004', 'Nguyễn Văn D', 'Hà Nội', '0123456789');
INSERT INTO borrowers VALUES ('BOR0005', 'Nguyễn Văn E', 'Hà Nội', '0123456789');