import * as z from 'zod';

export const categorySchema = z.object({
    nombre: z
        .string( "El nombre es obligatorio y debe ser texto")
        .trim()
        .min(1,"El nombre no puede estar vacío")
        .max(100, "El nombre no puede exceder los 100 caracteres")
})

export type CategoryInput = z.infer<typeof categorySchema>;

