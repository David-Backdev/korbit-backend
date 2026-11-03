import {ProductRepository} from '../repositories/ProductRepository';
import {notFoundError, conflictError} from '../../../shared/errors/AppError';
import {Producto} from '../../../generated/prisma/client';
import { CreateProductDTO, CreateProductRepoData } from '../interfaces/productInterface';

export class ProductService{

    constructor (private productRepository: ProductRepository) {}

 



}
