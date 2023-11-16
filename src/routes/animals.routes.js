import {Router} from "express";
import { buscarTodosAnimais } from "../controllers/animals.controller.js";
import { buscarAnimalPorId } from "../controllers/animals.controller.js";
import { criarAnimal } from "../controllers/animals.controller.js";
import { atualizarAnimal } from "../controllers/animals.controller.js";
import { deletarAnimal } from "../controllers/animals.controller.js";


const rotasAnimais = Router();

rotasAnimais.get("/", buscarTodosAnimais);

rotasAnimais.get("/:id", buscarAnimalPorId);

rotasAnimais.post("/", criarAnimal);

rotasAnimais.put("/:id", atualizarAnimal);

rotasAnimais.delete("/:id", deletarAnimal);

export default rotasAnimais;