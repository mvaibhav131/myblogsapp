import React from 'react'
import { useState } from 'react';
import {AppBar, Button, Toolbar, Typography,Box, Tabs, Tab} from "@mui/material"
import { Link } from 'react-router-dom';

const Header = () => {
    const [value,setVlaue]=useState(1);
  return (
    <div>
      <AppBar position='sticky'>
        <Toolbar>
            <Typography>Blogs App</Typography>
            <Box display="flex" marginLeft={"auto"} marginRight={"auto"}>
                <Tabs
                textColor='inherit'
                value={value}
                onChange={(e,val)=>setVlaue(val)}
                >
                    <Tab LinkComponent={Link} to="/Blogs" label="All Blogs"/>
                    <Tab LinkComponent={Link} to="/myBlogs" label="My Blogs"/>
                    <Tab LinkComponent={Link} to="/blogs/add" label="Add Blogs"/>
                </Tabs>
            </Box>
            <Box display="flex" marginLeft="auto">
                <Button LinkComponent={Link} to="/auth" variant="contained" sx={{margin:1,borderRadius:10}} color="warning">Login</Button>
                <Button LinkComponent={Link} to="/auth" variant="contained" sx={{margin:1,borderRadius:10}} color="warning">SignUp</Button>
                <Button LinkComponent={Link} to="/auth" variant="contained" sx={{margin:1,borderRadius:10}} color="warning">Logout</Button>
            </Box>
        </Toolbar>

      </AppBar>
    </div>
  )
}

export default Header
