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
export const signout=async(req,res,next)=>{
    try {
        res.clearCookie("access_token").status(200).json("User sign out successfully!");
    } catch (error) {
        next(error);
    }
}
export const getUser = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, "You are not authorized"));
    }
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.sort === "asc" ? 1 : -1;

        const users = await User.find().sort({ createdAt: sortDirection }).skip(startIndex).limit(limit);

        // Excluding password field
        const getUserWithoutPassword = users.map((user) => {
            const { password, ...rest } = user._doc; // Destructuring to exclude password
            return rest; // Return the user object without the password field
        });

        const totalUsers = await User.countDocuments();
        const now = new Date();
        const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

        const lastMonthUser = await User.countDocuments({
            createdAt: { $gte: oneMonthAgo },
        });

        res.status(200).json({
            users: getUserWithoutPassword,
            totalUsers,
            lastMonthUser,
        });
    } catch (error) {
        next(error);
    }
};
