import BorrowController from "../controllers/borrow.controler";
import { Router } from "express";
import { jwtGuard } from "../middlewares/jwtGuard";
import { newRecordValidate } from "../middlewares/validateBody";

const router = Router();
router.get("/record/get-all", [jwtGuard], BorrowController.getAllRecords);
router.get("/record/get/:record_id", [jwtGuard], BorrowController.getRecord);
router.post("/record/add", [jwtGuard, newRecordValidate], BorrowController.newBorrowRecord);
router.patch("/record/update/:record_id", [jwtGuard], BorrowController.updateRecord);
router.delete("/record/delete/:record_id", [jwtGuard], BorrowController.deleteRecord);
router.patch("/record/return/:record_id", [jwtGuard], BorrowController.returnBook);

router.get("/borrower/get-all", [jwtGuard], BorrowController.getAllBorrowers);
router.get("/borrower/get/:borrower_id", [jwtGuard], BorrowController.getBorrower);
router.post("/borrower/add", [jwtGuard], BorrowController.addBorrower);
router.patch("/borrower/update/:borrower_id", [jwtGuard], BorrowController.updateBorrower);
router.delete("/borrower/delete/:borrower_id", [jwtGuard], BorrowController.deleteBorrower);
export default router;

