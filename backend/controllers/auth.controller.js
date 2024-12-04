import bcrypt from "bcryptjs"
import User from "../model/user.model.js"
import { errorHandler } from "../utils/error.js";

export const signup=async(req,res,next)=>{
    const {username,email,password}=req.body;

    if(!username || !email || !password ||username===""||email===""||password===""){
        return next(errorHandler(400,"All fields are required!"));
    }

    const hasedpassword=bcrypt.hashSync(password,10);
    const newUser=new User({
        username,
        email,
        password:hasedpassword
    });

    try {
        await newUser.save();

        res.json("Signup seccessfull!");
    } catch (error) {
        return next(error);
    }
}