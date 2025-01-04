import { Router } from "express";
import { createUser } from "../controllers/userController";

const router=Router()
router.post('/signup', createUser);

export default router
