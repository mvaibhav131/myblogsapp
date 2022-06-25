import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Box, IconButton } from '@mui/material';
import {useNavigate} from "react-router-dom";
import axios from 'axios';


const Blog = ({id,title,description,imageUrl,cat,userName}) => {
const navigate= useNavigate();
const handleEdit=(e)=>{
navigate(`/myBlogs/${id}`)
};
const deleteRequest=async()=>{
  const res=await axios.delete(`http://localhost:5000/blogs/${id}`).catch(err=>console.log(err));
  const data=await res.data;
  return data;
}
const handleDelete=(e)=>{
  e.preventDefault();
deleteRequest()
window.location.reload();
alert("Blog Deleted Succesfully");
navigate("/Blogs");
};

    
   var cdate = (new Date()).toLocaleString();
  return (
    <Card sx={{ width:"50%" ,margin:"auto", padding:2, boxShadow:"5px 5px 10px #ccc",mt:2 , ":hover":{ boxShadow:"10px 10px 20px #ccc"},
    }}>
       <Box display="flex">
        <IconButton onClick={handleEdit} sx={{marginLeft:"auto"}}> <ModeEditOutlineIcon/> </IconButton>
        <IconButton onClick={handleDelete}> <DeleteForeverIcon/> </IconButton>
      </Box>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            {userName}
           </Avatar>
        }
        title={title}
        subheader={cdate}
      
      />
       <h2>{Blog.cat}</h2>
      <CardMedia
        component="img"
        height="294"
        image={imageUrl}
        alt="image"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
         {description}
        </Typography>
      </CardContent>
     
    </Card>
  )
}

export default Blog
