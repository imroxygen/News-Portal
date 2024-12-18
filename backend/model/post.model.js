import mongoose from "mongoose"

const postSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        default:"uncategorized"
    },
    image:{
        type:String,
        default:"https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    content:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true,
        unique:true
    }
},{timestamps:true})

const Post= mongoose.model("Post",postSchema)
export default Post;