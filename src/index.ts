import express, {Request, Response} from 'express';
import { config } from "./config/env.config";
import  categoryRoutes from "./modules/categories/routes/categoryRoutes";
import { errorHandler } from './shared/middleware/errorHandlerMiddleware';



const app=express();

// Middleware para procesar JSON en las peticiones
app.use(express.json());

// Ruta de verificación (Healthcheck)
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    message: 'Servidor Korbit ejecutándose correctamente',
    timestamp: new Date().toISOString()
  });
});

app.use("/api/v1/categories", categoryRoutes)
//app.use("/api/v1/", brandRoutes)

app.use(errorHandler)

app.listen(config.server.port, () => {
  console.log(`Servidor corriendo en http://localhost:${config.server.port} [${config.env}]`);
});
