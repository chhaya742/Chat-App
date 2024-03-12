import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoutes.js';
import messageRoutes from "./routes/messagesRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";

import connectToMongoDB from './DB/connectToMongoDB.js';

const app = express();
const PORT = process.env.PORT || 8000; // Fallback to port 3000 if PORT is not set55  

dotenv.config();

app.use(express.json()); //to parse the incoming request with JSON payload (from req.body)
app.use(cookieParser());
// app.get("/", (req, res) => {
//     //root route http://localhost:5000/
//     res.send("Hello World");
// });

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",usersRoutes);

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server Running on port ${PORT}`);
});
