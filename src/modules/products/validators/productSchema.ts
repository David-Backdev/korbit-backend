import * as z from 'zod';

export const productSchema = z.object({

    nombre: z
    .string("El nombre es obligatorio y debe ser texto")
    .trim()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(150, "El nombre no puede exceder los 150 caracteres"),

    id_categoria: z
    .number("El id de la categoría es obligatorio y debe ser un número")
    .int("El id de la categoría debe ser un número entero")
    .positive("El id de la categoría debe ser un número positivo"),

    id_marca: z
    .number("El id de la marca es obligatorio y debe ser un número")
    .int("El id de la marca debe ser un número entero")
    .positive("El id de la marca debe ser un número positivo"),

    precio_compra: z
    .number("El precio de compra es obligatorio y debe ser un número")
    .positive("El precio de compra debe ser un número positivo"),

    precio_venta: z
    .number("El precio de venta es obligatorio y debe ser un número")
    .positive("El precio de venta debe ser un número positivo"),

    stock_inicial: z
    .number("El stock inicial es obligatorio y debe ser un número")
    .int("El stock inicial debe ser un número entero")
    .nonnegative("El stock inicial no puede ser negativo")
    .default(0),

    stock_minimo:z
        .number("El stock mínimo debe ser un número")
        .int("El stock mínimo debe ser un número entero")
        .nonnegative("El stock mínimo no puede ser negativo")
        .default(0),

    descripcion:z
        .string("La descripción debe ser texto")
        .trim()
        .max(200,"La descripción no puede exceder los 200 caracteres")
        .optional(),

    codigo_barras:z
    .string("El código de barras debe ser texto")
        .trim()
        .max(50,"El código de barras no puede exceder los 50 caracteres")
        .optional(),
})

export type ProductInput = z.infer<typeof productSchema>;