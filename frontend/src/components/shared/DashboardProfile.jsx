import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const DashboardProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const profilePicRef=useRef();
  const [imageFile,setImageFile]=useState(null);
  const [imageUrl,setImageUrl]=useState(null);
  const handleImageChange=(e)=>{
    const file=e.target.files[0];
    if(file){
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file));
      
    }
  }

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">
        Update Your Profile
      </h1>
      <form className="flex flex-col gap-4">
        <input type="file" accept="image/*" hidden ref={profilePicRef} onChange={handleImageChange} />
        <div className="w-32 h-32 self-center cursor-pointer  overflow-hidden">
          <img
            src={imageUrl|| currentUser.profilePicture}
            alt="user profile"
            className="rounded-full w-full h-full object-cover border-8 border-gray-300"
            onClick={()=>profilePicRef.current.click()}
          />
        </div>
        <Input
          type="text"
          id="username"
          placeholder="User Name"
          defaultValue={currentUser.username}
          className="h-12 border border-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <Input
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={currentUser.email}
          className="h-12 border border-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <Input
          type="password"
          id="password"
          placeholder="Password"
          className="h-12 border border-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0"
        />

        <Button type="submit" className="h-12 bg-green-600">Update Profile</Button>

      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer" >Delete Account</span>
        <span className="cursor-pointer" >Sign Out</span>
      </div>
    </div>
  );
};

export default DashboardProfile;
