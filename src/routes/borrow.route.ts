import BorrowController from "../controllers/borrower.controler";
import { Router } from "express";
import { jwtGuard } from "../middlewares/jwtGuard";
import { newBorrowerValidate, newRecordValidate, updateBorrowerValidate } from "../middlewares/validateBody";

const router = Router();
router.get("/borrower/get-all", [jwtGuard], BorrowController.getAllBorrowers);
router.get("/borrower/get/:borrower_id", [jwtGuard], BorrowController.getBorrower);
router.post("/borrower/add", [jwtGuard,newBorrowerValidate], BorrowController.addBorrower);
router.patch("/borrower/update/:borrower_id", [jwtGuard, updateBorrowerValidate], BorrowController.updateBorrower);
router.delete("/borrower/delete/:borrower_id", [jwtGuard], BorrowController.deleteBorrower);
export default router;

