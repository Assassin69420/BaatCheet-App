import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js"
import connectDB from "./db/connectionMongoDb.js";
import messageRoutes from "./routes/messageRoutes.js"
import userRoutes from "./routes/userRoutes.js"

const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 7000;

app.get('/', (req, res) => {
    // It is the root route
    res.send("Hello World!!!");
}) ;

app.use('/api/auth', authRoutes)
app.use('/api/message', messageRoutes);
app.use ('/api/users', userRoutes);

app.listen(port, () => {
    connectDB();
    console.log(`server is running at ${port}`)
});
