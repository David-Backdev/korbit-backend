import {CategoryRepository} from '../repositories/CategoryRepository';
import {notFoundError, conflictError} from '../../../shared/errors/AppError';
import {Categoria} from '../../../generated/prisma/client';
import { CreateCategoryDTO, UpdateCategoryDTO } from '../interfaces/categoryInterface';


export class CategoryService{

    constructor (private categoryRepository: CategoryRepository) {}


    async createCategory(data: CreateCategoryDTO): Promise<Categoria> {


        const cleanName = data.nombre.trim(); //Limpiamos el nombre de espacios en blanco al inicio y al final

        //Verificamos que no exista previamente una categoria con el mismo nombre
        const existingCategory = await this.categoryRepository.findByName(cleanName);

        //Si existe, lanzamos un error de conflicto
        if( existingCategory){
            throw new conflictError('Ya existe una categoría con ese nombre');
        }

        //Si todo lo anterior es correcto, procedemos a crear la categoria
        const newCategory = await this.categoryRepository.createCategory({nombre: cleanName});

        return newCategory;
    }

    async updateCategory(id: number, data: UpdateCategoryDTO): Promise<Categoria> {

        const cleanName = data.nombre.trim();

        const existingCategory = await this.categoryRepository.findCategoryById(id);

        if (!existingCategory) {
            throw new notFoundError('Categoría no encontrada');
        }

        // Verificamos que no exista otra categoría con el mismo nombre
        const categoryWithSameName = await this.categoryRepository.findByName(cleanName);
        if (categoryWithSameName && categoryWithSameName.id_categoria !== id) {
            throw new conflictError('Ya existe una categoría con ese nombre');
        }

        const updatedCategory = await this.categoryRepository.updateCategory(id, { nombre: cleanName });
        return updatedCategory;
    }

    async findCategoryById(id: number): Promise<Categoria> {

        const category = await this.categoryRepository.findCategoryById(id);

        if(!category){
            throw new notFoundError('Categoría no encontrada');
        }

        return category;
    }

    async deleteCategory(id:number): Promise<void> {

        await this.findCategoryById(id); // Verificamos que la categoría exista

        const productsCount = await this.categoryRepository.countProductsByCategoryId(id);

        if (productsCount > 0) {
            throw new conflictError('No se puede eliminar la categoría porque tiene productos asociados');
        }
        await this.categoryRepository.deleteCategoryById(id);   
    
    }

    async findAllCategories(): Promise<Categoria[]> {
        return await this.categoryRepository.findAllCategories();
    }

}


