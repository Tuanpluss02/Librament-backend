import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'API Documentation',
    description: 'Description of your API',
  },
  servers: [
    {
      url: "http://localhost:3000",
      
    },
  ],
  tags: [
    {
      name: "Auth",
      description: "API for authentication",
    },
    {
      name: "Books",
      description: "API for managing books"
    },
    {
      name: "Records",
      description: "API for managing records"
    },
    {
      name: "Borrowers",
      description: "API for managing borrowers"
    },
    {
      name: "Publishers",
      description: "API for managing publishers"
    }
  ],
  // schemes: ["http", "https"],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      }
    },
    schemas: {
      register: {
        $employee_name: "Nguyen Van A",
        $password: "Abc123!@#",
        $position: "admin",
      },
      login: {
        $employee_id: "EMP0001",
        $password: "Abc123!@#",
      },
      borrower: {
        $full_name: "Borrower name",
        $address: "Borrower address",
        $phone_number: "Borrower phone number",
      },
      book: {
        $publisher_id: "PUB0001",
        $title: "Book title",
        $author: "Book author",
        $genre: "Book genre",
        $publication_year: 2021,
        $isbn: "Book ISBN",
        $quantity: 10,
      },
      record: {
        $book_id: "BOOK0001",
        $employee_id: "EMP0001",
        $borrower_id: "BOR0001",
        $borrow_date: "20/10/2023",
        $return_date: "20/11/2023",
        $status: "Borrowed",
      },
      publisher: {
        $publisher_name: "Publisher name",
      }
    },
  },
};

const option = {
  openapi: "3.1.0",

}

const outputFile = './swagger-output.json';
const routes = ['./src/index.ts'];

swaggerAutogen(option)(outputFile, routes, doc);