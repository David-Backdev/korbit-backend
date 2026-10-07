// src/config/prisma.ts
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { config } from "./env.config";

const connectionString = config.database.url;

if (!connectionString) {
  throw new Error("DATABASE_URL no está definida en las variables de entorno (.env)");
}

const adapter = new PrismaPg({ connectionString});

export const prisma = new PrismaClient({ adapter });