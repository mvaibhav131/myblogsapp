import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authAuctions } from "../store";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [inputs,setInputs]=useState({
    name:"",
    email:"",
    password:"",
  });
  const [isSignup,setIsSignup]=useState(false);
  const handleChange =(e)=>{
    setInputs((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value
    }));
  };
  const sendRequest=async (type="login")=>{
  const res= await axios.post(`http://localhost:5000/user/${type}`,{
       name:inputs.name,
       email:inputs.email,
       password:inputs.password
    }).catch(err=>console.log(err))

    const data=await res.data;
    return data;
  }
  const handleSubmit =(e)=>{
    e.preventDefault();
    console.log(inputs)
    if(isSignup){
      sendRequest("signup").then(()=>dispatch(authAuctions.login())).then(window.location.reload()).then(data=>console.log(data))
    } else{
      sendRequest("login").then(()=>dispatch(authAuctions.login())).then(()=>navigate("/Blogs")).then(data=>console.log(data))
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={400}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          boxShadow=" 10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={4}
          borderRadius={5}
        >
          <Typography padding={3} variant="h2" textAlign="center">{isSignup ? "SignUp":"Login"}</Typography>
          {isSignup &&<TextField value={inputs.name} name="name" onChange={handleChange} margin="normal" placeholder=" Enter Name" />}
          <TextField type={"email"} value={inputs.email} name="email" onChange={handleChange} margin="normal" placeholder="Enter Email"/>
          <TextField type={"password"} value={inputs.password} name="password" onChange={handleChange} margin="normal" placeholder="Enter Password"/>
          <Button type="submit" variant="contained" sx={{borderRadius:3,marginTop:3}} color="warning">{isSignup ? "Create Account":"Submit"}</Button>
          <Button onClick={()=>setIsSignup(!isSignup)} sx={{borderRadius:3,marginTop:2}} color="warning">Change To {isSignup ? "Login":"SignUp"}</Button>
        </Box>
      </form>
    </div>
  );
};

export default Auth;
