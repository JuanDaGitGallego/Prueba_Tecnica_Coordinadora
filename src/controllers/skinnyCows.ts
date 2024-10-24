import { RequestHandler } from "express";
import { IresponseRepositoryService, IValidCowsNumber } from "../interface/skinnyCows";
import * as repository from "../repository/skinnyCows"


export const getProduction: RequestHandler = async (req, res) => {
    try {
        const { code, message, ...resto }: IresponseRepositoryService = await repository.getProduct(req.body.N);
        return res.status(200).json({code, message, ...resto});
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "error_server", req });
    }
  };
  