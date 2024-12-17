import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { getFilePreview, uploadFile } from "@/lib/appwrite/uploadImage";
import { updateStart,updateFaliure, updateSuccess } from "@/redux/user/userSlice";

const DashboardProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const profilePicRef = useRef();
  const dispatch = useDispatch();
const {toast} = useToast();
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [formData, setFormData] = useState({});

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    if (!imageFile) {
      return currentUser.profilePicture;
    }
    try {
      const uploadedFile = await uploadFile(imageFile);
      return getFilePreview(uploadedFile.$id);
    } catch (error) {
      toast({ title: "Image upload failed. Please try again!" });
      console.error("Image upload failed:", error);
      return currentUser.profilePicture;
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateStart());
      const profilePicture = await uploadImage();
      const updateProfile = {
        ...formData,
        profilePicture,
      };
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateProfile),
      });

      const data = await res.json();

      if (data.success===false) {
        toast({ title: "Update failed. Please try again." });
        dispatch(updateFaliure(data.message));
      } else {
        toast({ title: "User updated successfully!" });
        dispatch(updateSuccess(data,));
      }
    } catch (error) {
      toast({ title: "Update failed. Please try again." });
      dispatch(updateFaliure(error.message));
      console.error(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">
        Update Your Profile
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          hidden
          ref={profilePicRef}
          onChange={handleImageChange}
        />
        <div className="w-32 h-32 self-center cursor-pointer overflow-hidden">
          <img
            src={imageUrl || currentUser.profilePicture || "/default-profile.png"}
            alt="user profile"
            className="rounded-full w-full h-full object-cover border-8 border-gray-300"
            onClick={() => profilePicRef.current.click()}
          />
        </div>
        <Input
          type="text"
          id="username"
          placeholder="User Name"
          value={formData.username || currentUser.username || ""}
          className="h-12 border border-slate-400"
          onChange={handleChange}
        />
        <Input
          type="email"
          id="email"
          placeholder="Email"
          value={formData.email || currentUser.email || ""}
          className="h-12 border border-slate-400"
          onChange={handleChange}
        />
        <Input
          type="password"
          id="password"
          placeholder="Password"
          value={formData.password || ""}
          className="h-12 border border-slate-400"
          onChange={handleChange}
        />
        <Button type="submit" className="h-12 bg-green-600">
          Update Profile
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default DashboardProfile;
