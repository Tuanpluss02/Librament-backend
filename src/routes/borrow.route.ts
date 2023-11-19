import BorrowController from "../controllers/borrower.controler";
import { Router } from "express";
import { jwtGuard } from "../middlewares/jwtGuard";
import { newBorrowerValidate, newRecordValidate, updateBorrowerValidate } from "../middlewares/validateBody";

const router = Router();
router.get("/get-all", [jwtGuard], BorrowController.getAllBorrowers);
router.get("/get/:borrower_id", [jwtGuard], BorrowController.getBorrower);
router.post("/add", [jwtGuard,newBorrowerValidate], BorrowController.addBorrower);
router.patch("/update/:borrower_id", [jwtGuard, updateBorrowerValidate], BorrowController.updateBorrower);
router.delete("/delete/:borrower_id", [jwtGuard], BorrowController.deleteBorrower);
export default router;

