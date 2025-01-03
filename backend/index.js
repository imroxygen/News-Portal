import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js"
import postRoutes from "./routes/post.route.js"
import commentRoutes from "./routes/comment.route.js"
import cookieParser from "cookie-parser"

dotenv.config();


mongoose.connect(
  process.env.DATABASE_URL
).then(()=>{
    console.log("Database is connected!");
}).catch((err)=>{
    console.log(err);
})


const app = express();
app.use(express.json());
app.use(cookieParser())
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}!`);
});

app.use("/api/auth",authRoutes);
app.use("/api/user",userRoutes);
app.use("/api/post",postRoutes);
app.use("/api/comment",commentRoutes)

app.use((err,req,res,next)=>{
    const statusCode=err.statusCode||500;

    const message=err.message||"Internal Server Error"

    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    });
});