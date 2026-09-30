import { CategoryService } from "../services/categoryServices";
import { Request, Response } from "express";

export class CategoryController {
  constructor(private CategoryService: CategoryService) {}

  create = async (req: Request, res: Response): Promise<void> => {
    // 1. Extraemos los datos validados del body
    const { nombre } = req.body;

    // 2. Llamamos al servicio (esperamos con await porque es asíncrono)
    const newCategory = await this.CategoryService.createCategory({ nombre });

    // 3. Respondemos con el código HTTP 201 (Created)
    res.status(201).json({
      success: true,
      message: "Categoría creada exitosamente",
      data: newCategory,
    });
  };

  getAll = async (_req: Request, res: Response): Promise<void> => {
    const categories = await this.CategoryService.findAllCategories();
    res.status(200).json({
      success: true,
      data: categories,
    });
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id); // Convertimos string a número
    const category = await this.CategoryService.findCategoryById(id);
    res.status(200).json({
      success: true,
      data: category,
    });
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    const { nombre } = req.body;
    const updatedCategory = await this.CategoryService.updateCategory(id, {
      nombre,
    });

    res.status(200).json({
      success: true,
      message: "Categoría actualizada exitosamente",
      data: updatedCategory,
    });
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    await this.CategoryService.deleteCategory(id);

    res.status(200).json({
      success: true,
      message: "Categoría eliminada exitosamente",
    });
  };
}
