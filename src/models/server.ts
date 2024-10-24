import config from "../config/config";
import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import "colors";

//routes
import skinnyCowsRoutes from "../routes/skinnyCows";

class Server {
  private app: Application;
  private port: string;
  private path: any;

  constructor() {
    this.app = express();
    this.port = config.port;
    this.path = {
      skinnyCows: "/api/skinnyCows",
    };
    // Middlwares
    this.middlewares();
    // Mis rutas
    this.routes();

    // cors proteger nuestra api para que solo reciba peticiones de cierto lugar
    // listas blancas y listas negras
  }

  middlewares() {
    // CORS
    this.app.use(cors());
    // Directorio publico
    this.app.use(express.static("public"));
    // resposes json
    this.app.use(express.json());
    // responses
    this.app.use(morgan("dev"));
  }

  routes() {
    this.app.use(this.path.skinnyCows, skinnyCowsRoutes);
  }

  listen() {
    console.clear();
    this.app.listen(this.port, () => {
      console.log(` 🔥 Server in port ${this.port}`.bold);
    });
  }
}

export default Server;
