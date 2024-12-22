import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <div className="bg-white hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px] border border-gray-400">
      <Link
        to={`/post/${post.slug}`}
        className="block h-[250px] w-full overflow-hidden"
      >
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </Link>
      <div className="p-3 flex flex-col gap-2">
        <p className="text-lg font-semibold line-clamp-1 text-slate-700">
          {post.title}
        </p>
        <span className="italic text-[16px] text-md text-slate-600">
          {post.category}
        </span>
        <Link to={`/post/${post.slug}`} className="border border-slate-500 hover:bg-blue-500 hover:text-white text-center py-2 rounded-md mt-auto">Read Article</Link>
      </div>
    </div>
  );
};

export default PostCard;
