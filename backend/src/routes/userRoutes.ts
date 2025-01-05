import { friendRequest } from './../controllers/userController';
import { Router } from "express";
import { createUser, filterUsers, login } from "../controllers/userController";

const router=Router()
router.post('/signup', createUser);
router.post('/login',login)
router.get('/users',filterUsers)
router.post('/friend_request',friendRequest)


export default router
