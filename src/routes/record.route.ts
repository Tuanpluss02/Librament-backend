
import { Router } from "express";
import { jwtGuard } from "../middlewares/jwtGuard";
import { newRecordValidate, updateRecordValidate } from "../middlewares/validateBody";
import { RecordController } from "../controllers/record.controller";

const router = Router();
router.get("/get-all", [jwtGuard], RecordController.getAllRecords);
router.get("/get/:record_id", [jwtGuard], RecordController.getRecord);
router.post("/add", [jwtGuard, newRecordValidate], RecordController.newBorrowRecord);
router.patch("/update/:record_id", [jwtGuard, updateRecordValidate], RecordController.updateRecord);
router.delete("/delete/:record_id", [jwtGuard], RecordController.deleteRecord);
router.patch("/return/:record_id", [jwtGuard], RecordController.returnBook);

export default router;
