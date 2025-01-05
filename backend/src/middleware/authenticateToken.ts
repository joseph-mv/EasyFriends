import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Middleware to authenticate JWT token
const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  

const decoded= jwt.verify(token as string, process.env.JWT_SECRET as string)
console.log('authenticated',decoded)

next()

}


export default authenticateToken;
