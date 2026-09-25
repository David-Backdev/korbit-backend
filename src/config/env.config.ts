import "dotenv/config";
import { z } from "zod";


const envSchema = z.object({

    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    PORT: z.coerce.number().default(3000),
    DATABASE_URL: z
        .string({
            message: "DATABASE_URL es obligatoria en el archivo .env",
        })
        .refine((value) => URL.canParse(value), {
            message: "DATABASE_URL debe ser una URL válida",
        }),

});


const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
    console.error("Error de validación de variables de entorno:");
    console.error(z.treeifyError(parsedEnv.error));
    process.exit(1);
}

export const config = {
    env: parsedEnv.data.NODE_ENV,
    server: {
        port: parsedEnv.data.PORT,
    },
    database: {
        url: parsedEnv.data.DATABASE_URL,
    },

} as const;