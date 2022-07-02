
import './App.css';
import React from "react"
import Header from './components/Header';
import {Routes,Route} from "react-router-dom";
import Auth from './components/Auth';
import Blogs from './components/Blogs';
import UserBlogs from './components/UserBlogs';
import BlogDetail from './components/BlogDetail';
import AddBlog from './components/AddBlog';
import { useSelector } from 'react-redux';
function App() {
  const isLogin= useSelector((state)=>state.isLogin);
  console.log(isLogin)
  return (
    <>
    <Header/>
    <div>
      <Routes>
        <Route path="/auth" element={<Auth/>}/>
        <Route path="/Blogs" element={<Blogs/>}/>
        <Route path="/myBlogs" element={<UserBlogs/>}/>
        <Route path="/myBlogs/:id" element={<BlogDetail/>}/>
        <Route path="/blogs/add" element={<AddBlog/>}/>
        <Route path="/auth" element={<Auth/>}/>
        </Routes>
    </div>
    </>
  );
}

export default App;
