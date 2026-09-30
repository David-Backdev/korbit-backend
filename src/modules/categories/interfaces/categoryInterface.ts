import { Categoria} from "../../../generated/prisma/client";

export type CategoryDTO = Categoria; 

export interface CreateCategoryDTO {

  nombre: string;

}

export interface UpdateCategoryDTO {

  nombre: string; 
}


