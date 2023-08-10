
import express from 'express'
const router = express.Router();
import * as authController from '../controller/authController.js'
import { protect } from '../middleware/authMiddleware.js';


router.post('/signup', authController.signup_post);
router.post('/login', authController.authUser);



export default router