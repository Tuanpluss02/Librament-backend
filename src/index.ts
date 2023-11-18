import express, { Request, Response } from "express";
import AuthRoute from "./routes/auth.route";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", AuthRoute);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
