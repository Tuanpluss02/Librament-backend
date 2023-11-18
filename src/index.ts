import express, { Request, Response } from "express";
import AuthRoute from "./routes/auth.route";
import BookRoute from "./routes/book.route";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", AuthRoute);
app.use("/books", BookRoute);

app.listen(port, () => {
  console.log(
    "\x1b[36m%s\x1b[0m",
    `🔥🔥🔥 Server running at http://localhost:${port}`
  );
});
