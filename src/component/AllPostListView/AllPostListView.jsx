import { useEffect, useState } from "react";
import { getAllPosts } from "../../../lib/firebase/posts/read_server";
import { getAllAuthor } from "../../../lib/firebase/author/read_server";
import { getAllCategory } from "../../../lib/firebase/category/read_server";
import { Link } from "react-router-dom";

const AllPostListView = () => {
  const [posts, setPosts] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const postsData = await getAllPosts();
      setPosts(postsData);
    };

    fetchData();
  }, []);

  return (
    <section className="p-10">
      <div className="grid grid-cols-4 gap-5">
        {posts?.map((post, index) => {
          return <PostCard key={index} post={post} />;
        })}
      </div>
    </section>
  );
};

const PostCard = ({ post }) => {
  const [author, setAuthor] = useState(null);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const fetchAuthor = async () => {
      const authorData = await getAllAuthor(post?.authorId);
      setAuthor(authorData);
    };

    const fetchCategory = async () => {
      const categoryData = await getAllCategory(post?.categoryId);
      setCategory(categoryData);
    };

    fetchCategory();
    fetchAuthor();
  }, [post?.authorId, post?.categoryId]);

  return (
    <Link to={`/posts/${post?.id}`}>
      <div className="flex flex-col gap-3 p-5 rounded">
        <div className="relative">
          <div className="absolute flex justify-end w-full p-3">
            <div className="flex gap-2 items-center bg-white bg-opacity-60 rounded px-2 py-1">
              <img
                className="h-6 w-6 rounded-full object-cover"
                src={category?.iconURL}
                alt=""
              />
              <h4 className="text-xs text-gray-500">{category?.name}</h4>
            </div>
          </div>
          <img
            className="h-[200px] w-full object-cover"
            src={post?.imageURL}
            alt=""
          />
        </div>
        <h1 className="font-bold text-white">{post?.title}</h1>
        <span className="text-sm text-gray-400" dangerouslySetInnerHTML={{ __html: post?.content.slice(0, 200) }}></span>
        <div className="flex justify-between items-center py-5">
          <div className="flex gap-2 items-center">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src={author?.photoURL}
              alt=""
            />
            <h1 className="text-sm text-rose-600 font-serif">{author?.name}</h1>
          </div>
          <h5 className="text-sm text-gray-500">
            {post?.timestamp?.toDate()?.toLocaleDateString()}
          </h5>
        </div>
      </div>
    </Link>
  );
};

export default AllPostListView;
