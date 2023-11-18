import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import {
  loginBodyValidate,
  registerBodyValidate,
} from "../middlewares/validateBody";

const router = Router();

router.post("/login", [loginBodyValidate], AuthController.login);
router.post("/register", [registerBodyValidate], AuthController.register);

export default router;
