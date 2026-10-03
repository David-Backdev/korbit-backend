// src/modules/brands/routes/brandRoutes.ts
import { Router } from "express";
import { prisma } from "../../../config/prisma";
import { BrandRepository } from "../repositories/BrandRepository";
import { BrandService } from "../services/brandServices";
import { BrandController } from "../controllers/BrandController";
import { validate } from "../../../shared/middlewares/validateMiddleware";
import { brandSchema } from "../validators/brandSchema";

const router = Router();

const brandRepository = new BrandRepository(prisma);
const brandService = new BrandService(brandRepository);
const brandController = new BrandController(brandService);

router.get("/", brandController.getAll);
router.get("/:id", brandController.getById);
router.post("/", validate(brandSchema), brandController.create);
router.put("/:id", validate(brandSchema), brandController.update);
router.delete("/:id", brandController.delete);

export default router;