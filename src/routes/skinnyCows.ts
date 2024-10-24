import { Router } from "express";
import { check } from "express-validator";
import {
  getProduction
} from "../controllers/skinnyCows";

const routes = Router();

routes.post(
  "/",
  getProduction
);


export default routes;
