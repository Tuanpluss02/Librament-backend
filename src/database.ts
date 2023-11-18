import * as mysql from "mysql2/promise";

const conn = mysql.createConnection({
  user: "root",
  password: "root",
  database: "library_system",
  host: "localhost",
});

export default conn;
