import mongoose from "mongoose";
import Blog from "../models/Blog";

export const getAllBlogs = async (req,res,next)=>{
    let blogs;
    try{
        blogs=await Blog.find()
        // blogs=await Blog.find().populate('user');

    }catch(err){
        console.log(err);
    }
    if(!blogs){
        return res.status(404).json({messaage:"No Blogs Found"});

    }
    return res.status(200).json({blogs});
};

export const addBlogs=async (req,res,next)=>{
    const {title,description,image}=req.body;
    //  let existingUser;
    
    // try{
    //     existingUser=await User.findById(user);
    // }catch(err){
    //     console.log(err);
    // }
    // if(!existingUser){
    //     return res.status(400).json({message:"Unable to find create by this id"});
    // }
    const blog= new Blog({
        title,
        description,
        image,
        // user
     });
    try {
        // const session=await mongoose.startSession();
        // session.startTransaction();
        // await blog.save({session})
        // existingUser.blogs.push(blog);
        // await existingUser.save({session});
        // await session.commitTransaction();
        await blog.save();
      }catch(err){
        console.log(err);
         return res.status(500).json({message:err})
    }
    return res.status(200).json({blog});
};

export const updateblog=async(req,res,next)=>{
    const {title,description,image}=req.body;
     const blogid=req.params.id;
     let blog;
     try{
     blog=await Blog.findByIdAndUpdate(blogid,{
    title,
    description,
    image
  })
}catch(err){
    return console.log(err);
}
if(!blog){
    return res.status(500).json({messaage:"Unable to update blog"});
}
 return res.status(200).json({blog});
};

export const getById=async (req,res,next)=>{
    const id =req.params.id;
    let blog;
    try{
        blog=await Blog.findById(id);
    }catch(err){
        return console.log(err);
    }
    if(!blog){
        return res.status(404).json({messaage:"No Blog Found"});
    }
    return res.status(200).json({blog});
};

export const deleteBlog=async(req,res,next)=>{
    const id=req.params.id;
    let  blog;
    try{
        blog=await Blog.findByIdAndRemove(id).populate('user');
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    }catch(err){
        console.log(err);
    }
    if(!blog){
       return res.status(500).json({message:"unable to delete"});

    }
    return res.status(200).json({messaage:"Succesfully deleted"})
};

export const getByUserId =async (req,res,next)=>{
    const userId=req.params.id;
    let userBlogs;
    try{
        userBlogs=await User.findById(userId).populate("blogs");

    }catch(err){
       return console.log(err);
    }
    if(!userBlogs){
        return res.status(404).json({message:"No blog found"});

    }
    return res.status(200).json({blogs:userBlogs})
};