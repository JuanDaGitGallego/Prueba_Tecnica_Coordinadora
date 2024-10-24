import dotEnv from "dotenv";
// utilizar variables de entorno
dotEnv.config();

export default {
    port: process.env.PORT  || "8080"
}