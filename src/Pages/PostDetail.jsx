import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPosts } from "../../lib/firebase/posts/read_server";
import { getAllAuthor } from "../../lib/firebase/author/read_server";
import { getAllCategory } from "../../lib/firebase/category/read_server";

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const postData = await getPosts(postId);
      setPost(postData);
    };

    const fetchAuthor = async () => {
      const authorData = await getAllAuthor(post?.authorId);
      setAuthor(authorData);
    };

    const fetchCategory = async () => {
      const categoryData = await getAllCategory(post?.categoryId);
      setCategory(categoryData);
    };

    fetchPost();
    fetchCategory();
    fetchAuthor();
  }, [post?.authorId, post?.categoryId, postId]);

  return (
    <div className="flex justify-center">
      <section className="flex flex-col gap-5 px-16 py-10">
        <div className="flex">
          <div className="flex gap-2 items-center bg-white bg-opacity-60 rounded px-2 py-1 border">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src={category?.iconURL}
              alt=""
            />
            <h4 className="text-xl text-white font-semibold">{category?.name}</h4>
          </div>
        </div>
        <h1 className="font-bold text-3xl text-white">{post?.title}</h1>

        <img
          className="h-[550px] w-full object-cover"
          src={post?.imageURL}
          alt=""
        />
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <img
              className="h-20 w-20 rounded-full object-cover"
              src={author?.photoURL}
              alt=""
            />

            <h1 className="text-xl text-rose-500">{author?.name}</h1>
            </div>
            <h5 className="text-xl font-bold text-gray-300">
              {post?.timestamp?.toDate()?.toLocaleDateString()}
            </h5>
          </div>
        
        <div className="text-white" dangerouslySetInnerHTML={{ __html: post?.content }}></div>
      </section>
    </div>
  );
};

export default PostDetail;
