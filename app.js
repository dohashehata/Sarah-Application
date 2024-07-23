import express from 'express';
import dbConnection from './db/dbConnection.js';
import userRouter from './src/modules/users/users.routes.js';
import messageRouter from './src/modules/message/message.routes.js';

const app = express();

// Middleware
app.use(express.json());

// Connect Database
dbConnection();

app.use('/users', userRouter);
app.use('/message',messageRouter)

const PORT = 5000; 
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
