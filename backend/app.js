import express from "express";
import mongoose from "mongoose";
import blogrouter from "./routes/blog-routes";
import router from "./routes/user-routes";
import cors from "cors";

const app=express();
app.use(express.json());
app.use(cors({
    origin:["http://localhost:3000"]
}));

app.use("/user",router);
app.use("/blogs",blogrouter)

mongoose.connect("mongodb://localhost:27017/Blog")
.then(()=> app.listen(5000))
.then(()=>console.log("conn to 5000"))
.catch((err)=>console.log(err))

