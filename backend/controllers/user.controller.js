import { errorHandler } from "../utils/error.js"
import User from "../model/user.model.js"
import bcrypt from "bcryptjs"

export const updateUser=async(req,res,next)=>{
    if(req.user.id !== req.params.userId){
        return next(errorHandler(403,"You can only update your own account!"));
    }
    
    if(req.body.password){
        if(req.body.password.length < 8){
            return next(errorHandler(400,"Password must be atleast 8 character"));
        }

        req.body.password=bcrypt.hashSync(req.body.password,10);
    }

    if(req.body.username){
        if(req.body.username.length < 5 || req.body.username.length > 20){
            return next(errorHandler(400,"Username must be between 5 to 20 character"));
        }
        if(req.body.username.includes(" ")){
            return next(errorHandler(400,"Username cannot contain spaces"));
        }
        if(!req.body.username.match(/^[a-zA-Z0-9]+$/)){
            return next(errorHandler(400,"Username can only contain letter and number"));
        }
    }
    
    try {
        
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            {
              $set: {
                username: req.body.username,
                email: req.body.email,
                profilePicture: req.body.profilePicture,
                password: req.body.password,
              },
            },
            { new: true }
          )
      
          const { password: pass, ...rest } = updatedUser._doc
      
          res.status(200).json(rest)
    } catch (error) {
        next(error);
    }

}

export const deleteUser=async (req,res,next)=>{

    if(req.user.id !== req.params.userId){
        return next(errorHandler(403,"You can only delete your own account!"));
    }

    try {
       await User.findByIdAndDelete(req.user.id);
       res.status(200).json("User has been deleted"); 
    } catch (error) {
        next(error);
    }
}