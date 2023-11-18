import * as mysql from "mysql2/promise";

const pool = mysql.createPool({
  user: "root",
  password: "root",
  database: "test",
  host: "localhost",
});
