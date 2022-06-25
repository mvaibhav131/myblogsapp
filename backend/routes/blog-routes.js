import express from "express";
import { getAllBlogs,addBlogs, updateblog, getById, deleteBlog, getByUserId } from "../controllers/blog-controller";
const blogrouter=express.Router();


blogrouter.get("/",getAllBlogs);
blogrouter.post("/add",addBlogs);
blogrouter.put("/update/:id",updateblog);
blogrouter.get("/:id",getById);
blogrouter.delete("/:id",deleteBlog);
blogrouter.get("/user/:id",getByUserId);

export default blogrouter;