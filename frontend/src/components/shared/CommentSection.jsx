import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";

const CommentSection = ({ postId }) => {
  const { toast } = useToast();
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate comment length
    if (comment.length > 200) {
      toast({
        title: "Comment length must be less than or equal to 200 characters.",
      });
      return;
    }

    try {
      // Send POST request to create a comment
      const res = await fetch(`/api/comment/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });

      const data = await res.json();

      // Handle response
      if (res.ok) {
        toast({ title: "Comment added successfully!" });
        setComment(""); // Clear the input
      } else {
        toast({ title: data.message || "Failed to add comment!" });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({ title: "Something went wrong! Please try again!" });
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p>Signed in as:</p>
          <img
            src={currentUser.profilePicture}
            alt={currentUser.username}
            className="h-5 w-5 object-cover rounded-full"
          />
          <Link
            to={"/dashboard?tab=profile"}
            className="text-sm text-blue-800 hover:underline"
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="text-sm text-gray-700 my-5 flex gap-1">
          You must be signed in to comment.
          <Link to={"/sign-in"} className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          className="border-2 border-gray-400 rounded-md p-4"
          onSubmit={handleSubmit}
        >
          <Textarea
            placeholder="Add a comment..."
            rows="3"
            maxLength="200"
            className="border border-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className="flex justify-between items-center mt-5">
            <p className="text-gray-500 text-sm">
              {200 - comment.length} Characters remaining
            </p>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CommentSection;
