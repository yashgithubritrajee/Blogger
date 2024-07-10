import { CirclePlus } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import PostsListView from "./PostsListView";


const Posts = () => {
  return (
    <main className="p-6 w-full flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-white">Posts</h1>
        <Link to='/admin/posts/postsform'>
        <button className="flex gap-2 items-center bg-blue-500 px-4 py-2 text-white rounded-full font-bold">
          <CirclePlus />
          Add
        </button>
        </Link>
        
        
      </div>
      <PostsListView/>
    </main>
  );
};

export default Posts;
