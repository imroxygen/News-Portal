import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignupForm from "./auth/forms/SignupForm";
import SigninForm from "./auth/forms/SigninForm";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Header from "./components/shared/Header";
import { Toaster } from "@/components/ui/toaster";
import Footer from "./components/shared/Footer";
import PrivateRoute from "./components/shared/PrivateRoute";
import CreatePost from "./pages/CreatePost";
import AdminPrivateRoute from "./components/shared/AdminPrivateRoute";
import EditPost from "./pages/EditPost";
import PostDetails from "./pages/PostDetails";
import ScrollToTop from "./components/shared/ScrollToTop";
import Search from "./pages/Search";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <ScrollToTop/>
      <Routes>
        <Route path="/sign-up" element={<SignupForm />} />
        <Route path="/sign-in" element={<SigninForm />} />

        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/about" element={<About />} />

        <Route element={<PrivateRoute/>} >
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<AdminPrivateRoute/>} >
          <Route path="/create-post" element={<CreatePost/>} />
          <Route path="/update-post/:postId" element={<EditPost/>} />
        </Route>

        <Route path="/news" element={<Search />} />
        <Route path="/post/:postSlug" element={<PostDetails />} />
      </Routes>
      <Footer />
      <Toaster />
    </BrowserRouter>
  );
};

export default App;
