import express from "express"
import { create, deletepost, getPosts, update } from "../controllers/post.controller.js";
import {verifyToken} from "../utils/verifyUser.js"
const router=express.Router();

router.post("/create",verifyToken,create)
router.get("/getpost",getPosts)
router.delete("/deletepost/:postId/:userId",verifyToken,deletepost)
router.put("/updatepost/:postId/:userId",verifyToken,update)

export default router;