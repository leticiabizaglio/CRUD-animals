import {Router} from "express";
import rotasAnimais from "./animals.routes.js";

const rotas = Router();

rotas.use("/animals", rotasAnimais);

rotas.get("/", (req, res) => {
    return res.status(200).send({ message: "Servidor Rodando!" });
  });

export default rotas;