
import { Router } from "express";
import { jwtGuard } from "../middlewares/jwtGuard";
import PublisherController from "../controllers/publisher.controller";
import { newPublisherValidate, updatePublisherValidate } from "../middlewares/validateBody";

const router = Router();
router.get("/get-all", [jwtGuard], PublisherController.getAll);
router.get("/get/:publisher_id", [jwtGuard], PublisherController.getById);
router.get("/:publisher_id/get-books", [jwtGuard], PublisherController.getAllBooks);
router.post("/add", [jwtGuard, newPublisherValidate], PublisherController.addPublisher);
router.patch("/update/:borrower_id", [jwtGuard,updatePublisherValidate], PublisherController.update);
router.delete("/delete/:borrower_id", [jwtGuard], PublisherController.delete);

export default router;

