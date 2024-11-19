import { Router } from "express";
import { registrarReserva } from "../controllers/reservas.controllers.js";

const router = Router();

router.post("/reservas", registrarReserva);

export default router;