import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { getFilePreview, uploadFile } from "@/lib/appwrite/uploadImage";
import {
  updateStart,
  updateFaliure,
  updateSuccess,
  deleteUserStart,
  deleteUserFaliure,
  deleteUserSuccess,
  signoutSuccess,
} from "@/redux/user/userSlice";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

const DashboardProfile = () => {
  const { currentUser, error } = useSelector((state) => state.user);
  const profilePicRef = useRef();
  const dispatch = useDispatch();
  const { toast } = useToast();
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

      if (data.success === false) {
        toast({ title: "Update failed. Please try again." });
        dispatch(updateFaliure(data.message));
      } else {
        toast({ title: "User updated successfully!" });
        dispatch(updateSuccess(data));
      }
    } catch (error) {
      toast({ title: "Update failed. Please try again." });
      dispatch(updateFaliure(error.message));
      console.error(error);
    }
  };
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());

      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFaliure(data.message));
      } else {
        dispatch(deleteUserSuccess());
      }
    } catch (error) {
      console.log(error);
      dispatch(deleteUserFaliure(error.message));
    }
  };
  const handleSignOut=async()=>{
    try {
      const res =await fetch("/api/user/signout",{
        method:"POST"
      })
      const data=await res.json();
      if(!res.ok){
        console.log(data.message)
      }else{
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error);
      
    }
  }
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
            src={
              imageUrl || currentUser.profilePicture || "/default-profile.png"
            }
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
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost">Delete Account</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600"
                onClick={handleDeleteUser}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Button variant="ghost" onClick={handleSignOut}>Sign Out</Button>
      </div>
      <p className="text-red-600">{error}</p>
    </div>
  );
};

export default DashboardProfile;
