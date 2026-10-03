import {Marca} from "../../../generated/prisma/client";

export type BrandDTO= Marca;

export interface CreateBrandDTO {
    nombre: string;
}

export interface UpdateBrandDTO {
    nombre: string;
}
