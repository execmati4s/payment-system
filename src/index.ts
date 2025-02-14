import express, { Application } from "express";
// import cors from 'cors';
import helmet from "helmet";
import { config } from "dotenv";
import routes from "./infrastructure/routes";

import dotenv from "dotenv";

config(); // Cargar variables de entorno

const app: Application = express();
const PORT = process.env.API_PAYMENT_PORT || 2025;

dotenv.config();

// Middlewares
// app.use(cors());
app.use(helmet());
app.use(express.json());

// Rutas
app.use("/api", routes);
// Servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
