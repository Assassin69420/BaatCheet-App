import path from "path";
import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js"
import connectDB from "./db/connectionMongoDb.js";
import messageRoutes from "./routes/messageRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import { app, server } from "./socket/socket.js";


dotenv.config();

app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 7000;
const __dirname = path.resolve();

app.get('/', (req, res) => {
    // It is the root route
    res.send("Hello World!!!");
}) ;

app.use('/api/auth', authRoutes)
app.use('/api/message', messageRoutes);
app.use ('/api/users', userRoutes);

app.use(express.static(path.join(__dirname, "/Frontend/dist")));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,"Frontend","dist","index.html"));
})

server.listen(port, () => {
    connectDB();
    console.log(`server is running at ${port}`)
});
