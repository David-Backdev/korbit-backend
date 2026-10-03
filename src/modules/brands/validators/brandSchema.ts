import {z} from 'zod';

export const brandSchema = z.object({
    nombre: z.string({error:"El nombre de la marca debe ser un texto"}).min(1, { message: "El nombre de la marca es obligatorio" }).max(100, { message: "El nombre de la marca no puede exceder los 100 caracteres" }),
});

