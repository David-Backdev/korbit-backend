// src/shared/middlewares/errorHandler.middleware.ts
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { AppError } from "../errors/AppError";

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      error: {
        type: err.name,
        message: err.message,
      },
    });
    return;
  }

  console.error(" Error interno:", err);

  res.status(500).json({
    success: false,
    error: {
      type: "InternalServerError",
      message: "Ha ocurrido un error inesperado en el servidor",
    },
  });
};