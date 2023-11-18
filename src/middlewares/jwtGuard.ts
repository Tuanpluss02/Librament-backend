import { NextFunction, Response, Request } from "express";
import { iResponse } from "../utils/iResponse";
import { verifyToken } from "../utils/jwtUtil";

export const jwtGuard = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];
    if (!token) {
      return iResponse(res, 401, "Token not found");
    }
    const payload = verifyToken(token);
    console.log(payload);
    if (!payload) {
      return iResponse(res, 401, "Invalid token");
    }
    res.locals.employee_id = payload.sub;
    res.locals.position = payload.position;
    next();
  } catch (err) {
    console.log(err);
    return iResponse(res, 401, "Invalid token");
  }
};
