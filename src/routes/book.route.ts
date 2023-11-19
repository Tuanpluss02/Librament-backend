import { Router } from "express";
import BookController from "../controllers/book.controller";
import { newbookBodyValidate, updateBookValidate } from "../middlewares/validateBody";
import { jwtGuard } from "../middlewares/jwtGuard";

const router = Router();

router.get("/get", [jwtGuard], BookController.getBook);
router.get("/get-all", [jwtGuard], BookController.getAll);
router.post("/new", [jwtGuard, newbookBodyValidate], BookController.addBook);
router.patch("/update/:book_id", [jwtGuard,updateBookValidate],BookController.updateBook);
router.delete("/delete/:book_id",[jwtGuard], BookController.deleteBook);

export default router;
