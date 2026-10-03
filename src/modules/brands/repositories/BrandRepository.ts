import {PrismaClient, Marca} from "../../../generated/prisma/client";
import {CreateBrandDTO, UpdateBrandDTO} from "../interfaces/brandInterace";

export class BrandRepository {
    constructor(private prisma: PrismaClient) {}

    async createBrand(data: CreateBrandDTO) {
        return this.prisma.marca.create({
            data: {
                nombre: data.nombre,
            },
        });
    }

    async findAllBrands(): Promise<Marca[]>{
        return this.prisma.marca.findMany({
            orderBy: { nombre: 'asc' }
        });
    }

    async findBrandById(id: number): Promise<Marca | null>{
        return this.prisma.marca.findUnique({
            where: {id_marca: id},
        });
    }

    async findBrandByName(nombre: string): Promise<Marca|null> {
        return this.prisma.marca.findFirst({
            where: {
                nombre:{
                    equals: nombre,
                    mode: "insensitive",
                },
            },
        });
    }


    async updateBrand(id: number, data: UpdateBrandDTO): Promise<Marca> {
        return this.prisma.marca.update({
            where: {id_marca: id},
            data: {nombre: data.nombre},
        });
    }

    async countProductsByBrandId(id: number): Promise<number> {
        return this.prisma.producto.count({
            where: {id_marca: id},
        });
    }

    async deleteBrandById(id: number): Promise<void> {
        await this.prisma.marca.delete({
            where: {id_marca: id},
        });
    }


}

