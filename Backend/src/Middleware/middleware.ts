import jwt from "jsonwebtoken"
import { Request,Response,NextFunction } from "express";
import { serect } from "../config";

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"]
    const decoded = jwt.verify(header as string, serect);

    if(decoded){
        //@ts-ignore
        req.userId = decoded.id;
        next();
    }
    else{
        res.status(401).json({ message: "Not authorized" });
    }
}