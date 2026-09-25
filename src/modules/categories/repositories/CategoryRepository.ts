import { PrismaClient, Categoria} from "../../../generated/prisma/client";
import { CreateCategoryDTO, UpdateCategoryDTO } from "../interfaces/categoryInterface";

export class CategoryRepository {

  constructor (private prisma: PrismaClient) {}

  async createCategory(data: CreateCategoryDTO): Promise<Categoria> {
    return this.prisma.categoria.create({
      data: {
        nombre: data.nombre,
      }
    });
  }

  async updateCategory(id: number,data:UpdateCategoryDTO ): Promise<Categoria> {
    return this.prisma.categoria.update({
      where: {id_categoria: id},
      data:{nombre: data.nombre}
    });
  }

  async findAllCategories(): Promise<Categoria[]> {
    return this.prisma.categoria.findMany({
      orderBy:{ nombre: 'asc',}
    });
  }

  async findCategoryById(id: number): Promise<Categoria | null>{
    return this.prisma.categoria.findUnique({
      where: {id_categoria: id}
    });
  }

    //Aquí la función para validar si existen categorias duplicadas antes de guardar

  async findByName(nombre: string): Promise<Categoria | null> {
    return this.prisma.categoria.findFirst({
      where: {
        nombre: {
          equals: nombre,
          mode: "insensitive", // Esto hace que la búsqueda sea insensible a mayúsculas y minúsculas
        },
      },
    });

    /**
     * Para borrar una categoria, primero necesitamos validar que 
     * no tenga un producto vinculado a ella. Para esto tenemos que dividir
     * la función en dos partes: 
     * 
     * 1) una función que cuente la cantidad de productos vinculados
     * 2) una función que borre la categoria en sí. 
     * En service nos encargamos la lógica
     */

  
  }
  async countProductsByCategoryId(id: number): Promise<number>{
    return this.prisma.producto.count({
      where: {id_categoria: id },
    });

  }
  
  async deleteCategoryById (id: number): Promise<void> {
    await this.prisma.categoria.delete({
      where: {id_categoria: id}
    });
  }

}

