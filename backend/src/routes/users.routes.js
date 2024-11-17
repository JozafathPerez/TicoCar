import { Router } from "express";
import { getUsers, createUser, validateUser } from "../controllers/users.controllers.js";

const router = Router();

router.get("/users", getUsers);
router.post("/users", createUser);
router.post("/users/validate", validateUser);

export default router;