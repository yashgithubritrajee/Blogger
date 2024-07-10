import { CirclePlus } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import AuthorsListView from "./AuthorListView";


const Author = () => {
  return (
    <main className="p-6 w-full flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-white">Author</h1>
        <Link to='/admin/authors/authorform'>
        <button className="flex gap-2 items-center bg-blue-500 px-4 py-2 text-white rounded-full font-bold">
          <CirclePlus />
          Add
        </button>
        </Link>
        
        
      </div>
      <AuthorsListView/>
    </main>
  );
};

export default Author;
