import express from 'express'
import { register,login} from '../Controller/User.js'
//import { Authenticate } from '../middlewares/auth.js';

const router = express.Router();

// user register
router.post("/api/register", register);

// user login
router.post('/api/login',login)


export default router