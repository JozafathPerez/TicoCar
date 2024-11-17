import { Router } from "express";
import { getUsers, createUser, validateUser } from "../controllers/users.controllers.js";
import { getVehicles } from "../controllers/vehicles.controllers.js";

const router = Router();

router.get("/users", getUsers);
router.post("/users", createUser);
router.post("/users/validate", validateUser);
router.get("/vehicles", getVehicles);

export default router;