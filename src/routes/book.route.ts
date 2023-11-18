import { Router } from "express";
import BookController from "../controllers/book.controller";
import { newbookBodyValidate } from "../middlewares/validateBody";

const router = Router();

router.get("/:book_id", BookController.getBook);
router.post("/new", [newbookBodyValidate], BookController.addBook);
router.patch("/:book_id", BookController.updateBook);
router.delete("/:book_id", BookController.deleteBook);

export default router;
