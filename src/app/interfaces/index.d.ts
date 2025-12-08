import "express";
import { JwtPayload } from "jsonwebtoken";
import { Role } from "../constants/role";  
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload & {
        id: string;
        email: string;
        role: Role;
      };
    }
  }
}
