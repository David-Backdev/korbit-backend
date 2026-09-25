import { Request, Response, NextFunction } from "express";
import { ZodType, ZodError } from "zod";


type ResquestLocation = "body" | "query" | "params";

export const validateBody = (schema: ZodType, location: ResquestLocation="body")=>{

   return (req: Request, res: Response, next: NextFunction): void => {

     try {
          // Validamos los datos sanit
     } catch (error) {
      
     }
   }
}
