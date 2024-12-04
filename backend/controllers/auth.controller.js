import bcrypt from "bcryptjs"
import User from "../model/user.model.js"

export const signup=async(req,res)=>{
    const {username,email,password}=req.body;

    if(!username || !email || !password ||username===""||email===""||password===""){
        return res.status(400).json({message:"All field are required!"})
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
        res.status(500).json({message:error.message});
    }
}