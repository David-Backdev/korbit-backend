import {z} from 'zod';

export const categorySchema = z.object({
    nombre: z
        .string({error: "El nombre es obligatorio y debe ser texto"})
        .trim()
        .min(1, {error: "El nombre no puede estar vacío"})
        .max(100, {error: "El nombre no puede exceder los 100 caracteres"})
})

export type CategoryInput = z.infer<typeof categorySchema>;

