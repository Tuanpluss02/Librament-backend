import BorrowController from "../controllers/borrow.controler";
import { Router } from "express";

const router = Router();
router.get("/record/get-all", BorrowController.getAllRecords);
router.get("/record/get/:record_id", BorrowController.getRecord);
router.post("/record/add", BorrowController.newBorrowRecord);
router.patch("/record/update/:record_id", BorrowController.updateRecord);
router.delete("/record/delete/:record_id", BorrowController.deleteRecord);
router.patch("/record/return/:record_id", BorrowController.returnBook);


router.get("/borrower/get-all", BorrowController.getAllBorrowers);
router.get("/borrower/get/:borrower_id", BorrowController.getBorrower);
router.post("/borrower/add", BorrowController.addBorrower);
router.patch("/borrower/update/:borrower_id", BorrowController.updateBorrower);
router.delete("/borrower/delete/:borrower_id", BorrowController.deleteBorrower);

export default router;

