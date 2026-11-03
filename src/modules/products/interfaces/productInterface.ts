import { Producto } from "../../../generated/prisma/client";

export type ProductDTO = Producto;

export interface CreateProductDTO {
  nombre: string;
  descripcion?: string;
  id_categoria: number;
  id_marca: number;
  precio_compra: number;
  precio_venta: number;
  stock_inicial: number;
  stock_minimo?: number;
  codigo_barras?: string;
}

export interface CreateProductRepoData extends CreateProductDTO {
  sku: string;
  stock_disponible: number;
  id_usuario_registro: number;
}
