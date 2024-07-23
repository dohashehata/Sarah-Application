import { Router } from 'express';

import { signIn, signUp } from './users.controller.js';


const userRouter = Router();

// User Routes
userRouter.post('/signup', signUp);
userRouter.post('/signin', signIn);


export default userRouter;


  