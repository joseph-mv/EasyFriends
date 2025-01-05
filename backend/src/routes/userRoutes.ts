import { cancelRequest, friendRequest } from './../controllers/userController';
import { Router } from "express";
import { createUser, filterUsers, login } from "../controllers/userController";
import authenticateToken from '../middleware/authenticateToken'
const router=Router()
router.post('/signup', createUser);
router.post('/login',login)
router.get('/users',filterUsers)
router.post('/friend_request',authenticateToken ,friendRequest)
router.post('/cancel_request',authenticateToken ,cancelRequest)


export default router
