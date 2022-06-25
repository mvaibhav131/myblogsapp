import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { InputLabel, TextField, Typography,Box, Button } from '@mui/material'


const BlogDetail = () => {
  const navigate=useNavigate();
  const[blog,setBlog]=useState();
  const id =useParams().id;
  console.log(id)
  const [inputs,setInputs]=useState({
    
  });
  const handleChange=(e)=>{
    setInputs((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value,
    }));
  }
  const fetchDetails =async () =>{
    const res=await axios.get(`http://localhost:5000/blogs/${id}`).catch(err=>console.log(err));
    const data=await res.data;
    return data;
  }
  useEffect(()=>{ 
    fetchDetails().then((data)=>{
      setBlog(data.blog)
      setInputs({title:data.blog.title,description:data.blog.description,image:data.blog.image});
    });
  },[id])

  const sendRequest=async ()=>{
    const res= await axios.put(`http://localhost:5000/blogs/update/${id}`,{
      title:inputs.title,
      description:inputs.description,
      image:inputs.image
    }).catch(err=>console.log(err));
    const data=await res.data;
    return data;
  }


  console.log(blog)

  const handleSubmit =(e)=>{
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(data=>console.log(data)).then(()=>navigate("/myBlogs"))

  }

  return (
    <div>
      {inputs &&
    <form onSubmit={handleSubmit}>
    <Box border={3} borderColor="blue" borderRadius={10} boxShadow="10px 10px 20px #ccc" padding={3} margin={"auto"} mt={2} display="flex" flexDirection={"column"} width={"80%"}>
      <Typography fontWeight={"bold"} padding={2} color="grey" variant="h3" textAlign={"center"}>Update Your Blogs</Typography>
      <InputLabel sx={{mb:1,mt:2,fontSize:"24px", fontWeight:"bold"}}>Title</InputLabel>
      <TextField value={inputs.title} name="title" onChange={handleChange} margin='auto' variant="outlined"/>
      <InputLabel sx={{mb:1,mt:2,fontSize:"24px", fontWeight:"bold"}}>Description</InputLabel>
      <TextField value={inputs.description} name="description" onChange={handleChange} margin='auto' variant="outlined"/>
      <InputLabel sx={{mb:1,mt:2,fontSize:"24px", fontWeight:"bold"}}>Image URL</InputLabel>
      <TextField value={inputs.image} name="image" onChange={handleChange} margin='auto' variant="outlined"/>
      <Button sx={{mt:2,borderRadius:4}} variant="contained" color="warning" type='submit'>Submit</Button>
    </Box>
  </form>
}
</div>
  )
}

export default BlogDetail
