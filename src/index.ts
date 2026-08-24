import express, {Request, Response} from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app=express();
const PORT=process.env.PORT || 3000;

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

app.listen(PORT, () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`);
});