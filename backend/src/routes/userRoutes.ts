import { acceptRequest, cancelRequest, friendRequest, getUser, recommendedFriends, unFriend } from './../controllers/userController';
import { Router } from "express";
import { createUser, filterUsers, login } from "../controllers/userController";
import authenticateToken from '../middleware/authenticateToken'
const router=Router()
router.post('/signup', createUser);
router.post('/login',login)
router.get('/users',filterUsers)
router.get('/get_user',authenticateToken,getUser)
router.post('/friend_request',authenticateToken ,friendRequest)
router.post('/cancel_request',authenticateToken ,cancelRequest)
router.post('/decline_request',authenticateToken ,cancelRequest)
router.post('/accept_request',authenticateToken ,acceptRequest)
router.post('/unfriend',authenticateToken,unFriend)
router.post('/recommended',authenticateToken,recommendedFriends)






export default router
