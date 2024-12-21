import Advertise from "@/components/shared/Advertise";
import CommentSection from "@/components/shared/CommentSection";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const PostDetails = () => {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getpost?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setLoading(false);
          setError(true);
          return;
        } else {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        console.log(error);
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <img
          src="https://cdn-icons-png.flaticon.com/128/39/39979.png"
          alt="loading"
          className="w-20 animate-spin"
        />
      </div>
    );
  }
  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center font-bold max-w-3xl mx-auto lg:text-4xl text-slate-700 underline">
        {post && post.title}
      </h1>
      <Link
        to={`/search?category=${post && post.category}`}
        className="self-center mt-5"
      >
        <Button className="border border-slate-500" variant="outline">
          {post && post.category}
        </Button>
      </Link>
      <img
        src={post && post.image}
        alt={post && post.title}
        className="mt-10 p-3 max-h-[500px] w-full object-cover"
      />
      <div className="flex justify-between p-3 mx-auto w-full max-w-2xl text-xs">
        <span>{post && new Date(post.createdAt).toLocaleString()}</span>
        <span className="italic">
          {post && (post.content.length / 100).toFixed(0)} mins read
        </span>
      </div>
      <Separator className="bg-slate-500" />

      <div
        className="p-3 max-w-3xl mx-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>
      <div className="max-w-4xl mx-auto w-full">
        <Advertise/>
      </div>
      <CommentSection postId={post._id} />
    </main>
  );
};

export default PostDetails;