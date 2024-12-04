import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js"
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
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}!`);
});

app.use("/api/auth",authRoutes);