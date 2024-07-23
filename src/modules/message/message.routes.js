import { Router } from 'express';

import auth from '../../middleware/auth.js';

import { addMessage, deleteMessage, getMessages } from "./message.controller.js";
const messageRouter = Router();

messageRouter.post('/add', auth(), addMessage);
messageRouter.get('/get', auth(), getMessages);
messageRouter.delete('/delete/:id', auth(), deleteMessage);

 export default messageRouter
 