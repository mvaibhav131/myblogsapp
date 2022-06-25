import React,{useState,useEffect} from 'react';
import axios from "axios";
import Blog from './Blog';

const Blogs = () => {
    const [blogs,setBlogs]=useState();
    const sendRequest = async () => {
        const res=await axios.get("http://localhost:5000/blogs")
        .catch((err)=>console.log(err));
        const data= await res.data;
        return data;
        
    };
    useEffect(()=>{
     sendRequest().then((data)=>setBlogs(data.blogs));
    },[]);
  console.log(blogs);
  return (
    <div>
     {blogs && blogs.map((blog,index)=> <Blog key={index} id={blog._id} title={blog.title} description={blog.description} imageUrl={blog.image} userName={blog.user} cat={blog.cat}/>)}
    </div>
  )
}

export default Blogs
