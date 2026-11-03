import { PrismaClient, Producto } from "../../../generated/prisma/client";
import { CreateProductDTO, CreateProductRepoData } from "../interfaces/productInterface";

export class ProductRepository {

  constructor (private prisma: PrismaClient){}


  async checkProductExistence (nombre: string, id_marca: number): Promise<Producto | null> {
    return await this.prisma.producto.findFirst({
      where: {
        nombre: {
          equals: nombre,
          mode: "insensitive",
        },
        id_marca: id_marca,
      }
    });
  }

  async createProduct (data: CreateProductRepoData) {
    const newProduct = await this.prisma.producto.create({
      data: {
        nombre: data.nombre,
        id_categoria: data.id_categoria,
        descripcion: data.descripcion,
        codigo_barras: data.codigo_barras,
        id_marca: data.id_marca,
        precio_compra: data.precio_compra,
        precio_venta: data.precio_venta,
        stock_inicial: data.stock_inicial,
        stock_minimo: data.stock_minimo,
        sku: data.sku,
        stock_disponible: data.stock_disponible,
        id_usuario_registro: data.id_usuario_registro,
      },
      include: {categoria: true, marca: true,},
    });
    return newProduct;
  }


}

