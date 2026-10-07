// src/modules/brands/controllers/BrandController.ts
import { Request, Response } from "express";
import { BrandService } from "../services/brandServices";

export class BrandController {
  constructor(private brandService: BrandService) {}

  create = async (req: Request, res: Response): Promise<void> => {
    const { nombre } = req.body;
    const newBrand = await this.brandService.createBrand({ nombre });

    res.status(201).json({
      success: true,
      message: "Marca creada exitosamente",
      data: newBrand,
    });
  };

  getAll = async (_req: Request, res: Response): Promise<void> => {
    const brands = await this.brandService.findAllBrands();

    res.status(200).json({
      success: true,
      data: brands,
    });
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    const brand = await this.brandService.findBrandById(id);

    res.status(200).json({
      success: true,
      data: brand,
    });
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    const { nombre } = req.body;
    const updatedBrand = await this.brandService.updateBrand(id, { nombre });

    res.status(200).json({
      success: true,
      message: "Marca actualizada exitosamente",
      data: updatedBrand,
    });
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    await this.brandService.deleteBrandById(id);

    res.status(200).json({
      success: true,
      message: "Marca eliminada exitosamente",
    });
  };
}
