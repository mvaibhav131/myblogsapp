import { InputLabel, TextField, Typography, Box, Button, Select, MenuItem, FormControl } from "@mui/material";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
    cat:"",
  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:5000/blogs/add", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        cat:inputs.cat,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest()
      .then((data) => console.log(data))
      .then(navigate("/Blogs"));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          border={3}
          borderColor="blue"
          borderRadius={10}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin={"auto"}
          mt={2}
          display="flex"
          flexDirection={"column"}
          width={"80%"}
        >
          <Typography
            fontWeight={"bold"}
            padding={2}
            color="grey"
            variant="h3"
            textAlign={"center"}
          >
            Post Your Blogs
          </Typography>
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Title
          </InputLabel>
          <TextField
            value={inputs.title}
            name="title"
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            placeholder="Enter Blog Title"
          />
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Description
          </InputLabel>
          <TextField
            value={inputs.description}
            name="description"
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            placeholder="Enter Blog Description"
          />
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Image URL
          </InputLabel>
          <TextField
            value={inputs.image}
            name="image"
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            placeholder="Enter Blog Images URL"
          />
          
          
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
           Category
          </InputLabel>
     
          <TextField
            value={inputs.cat}
            name="cat"
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            placeholder="Enter Blog Category"
          />
         


          <Button
            sx={{ mt: 2, borderRadius: 4 }}
            variant="contained"
            color="warning"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddBlog;
