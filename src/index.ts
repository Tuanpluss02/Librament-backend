import express, { Request, Response } from "express";
import AuthRoute from "./routes/auth.route";
import BookRoute from "./routes/book.route";
import BorrowRoute from "./routes/borrow.route";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger-output.json";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors());

app.use("/auth", AuthRoute);
app.use("/books", BookRoute);
app.use("/borrows", BorrowRoute);

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { explorer: true })
);

app.listen(port, () => {
  console.log(
    "\x1b[36m%s\x1b[0m",
    `🔥🔥🔥 Server running at http://localhost:${port}/docs`
  );
});
