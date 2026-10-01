// src/modules/categories/routes/categoryRoutes.ts
import { Router } from "express";
import { prisma } from "../../../config/prisma";
import { CategoryRepository } from "../repositories/CategoryRepository";
import { CategoryService } from "../services/categoryServices";
import { CategoryController } from "../controllers/CategoryController";
import { validate } from "../../../shared/middleware/validateMiddleware";
import { categorySchema } from "../validators/categorySchema"

const router = Router();

const categoryRepository = new CategoryRepository(prisma);
const categoryService = new CategoryService(categoryRepository);
const categoryController = new CategoryController(categoryService);


router.get("/", categoryController.getAll);
router.get("/:id", categoryController.getById);
router.post("/", validate(categorySchema), categoryController.create);
router.put("/:id", validate(categorySchema), categoryController.update);
router.delete("/:id", categoryController.delete);

export default router;
