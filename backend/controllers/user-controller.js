import User from "../models/User";

export const getAllUser = async (req,res,next)=>{
    let users;
    try{
        users=await User.find();
    }catch (err){
      return console.log(err);
    }
    if(!users){
        return res.status(404).json({message:"No Users Found"});
    }
    return res.status(200).json({users});
};

export const signup=async (req,res,next)=>{
    const {name,email,password}=req.body;
    let existingUser;
    try{
        existingUser=await User.findOne({email});
    }catch(err){
       return  console.log(err);
     }
     if(existingUser){
        return res.status(400).json({message:"User Already exist"})
     }
     const user=new User({
        name,
        email,
        password,
        blogs:[],
     });
     try{
       await user.save();
     }catch(err){
       return console.log(err);
     }
     return res.status(201).json({user})
};

export const login=async (req,res,next)=>{
    const {email,password}=req.body;
    let existingUser;
    try{
        existingUser=await User.findOne({email});
    }catch(err){
       return  console.log(err);
     }
     if(!existingUser){
        return res.status(404).json({message:"Couldn't find user"});
     }

     const ispasswordcorrect=await User.findOne({password});
     if(!ispasswordcorrect){
        return res.status(400).json({message:"Incorrect Password"});

     }
     return res.status(200).json({message:"Login Successfull"});
};