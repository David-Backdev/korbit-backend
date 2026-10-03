import { BrandRepository } from "../repositories/BrandRepository";
import { notFoundError, conflictError } from "../../../shared/errors/AppError";
import { Marca } from "../../../generated/prisma/client";
import { CreateBrandDTO,UpdateBrandDTO } from "../interfaces/brandInterace";


export class BrandService {
  constructor(private brandRepository: BrandRepository){}

  async createBrand (data: CreateBrandDTO): Promise<Marca>{
    const cleanName=data.nombre.trim();


      const existingBrand = await this.brandRepository.findBrandByName(cleanName);
      if (existingBrand){
        throw new conflictError("Ya existe una marca con ese nombre");

      }
      return await this.brandRepository.createBrand({nombre: cleanName})

    }

     async findAllBrands(): Promise<Marca[]> {
    return await this.brandRepository.findAllBrands();
  }

  async findBrandById(id: number): Promise<Marca> {
    const brand = await this.brandRepository.findBrandById(id);
    if (!brand) {
      throw new notFoundError(`Marca con ID ${id} no encontrada`);
    }
    return brand;
  }

  async updateBrand(id: number, data: UpdateBrandDTO): Promise<Marca> {
    await this.findBrandById(id);

    const cleanName = data.nombre.trim();

    const brandWithSameName = await this.brandRepository.findBrandByName(cleanName);
    if (brandWithSameName && brandWithSameName.id_marca !== id) {
      throw new conflictError("Ya existe otra marca con ese nombre");
    }

    return await this.brandRepository.updateBrand(id, { nombre: cleanName });
  }

  async deleteBrandById(id: number): Promise<void> {
    await this.findBrandById(id);

    const productsCount = await this.brandRepository.countProductsByBrandId(id);
    if (productsCount > 0) {
      throw new conflictError("No se puede eliminar la marca porque tiene productos asociados");
    }

    await this.brandRepository.deleteBrandById(id);
  }
}


