import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { usePostsForm } from "../context/PostFormContext";
import { useCategories } from "../../../../lib/firebase/category/read";
import { useAuthors } from "../../../../lib/firebase/author/read";
import { RTEField } from "./components/RTEField";

const PostsForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const updatePostsId = searchParams.get("id");

  const {
    data,
    isLoading,
    error,
    isDone,
    handelData,
    handelCreate,
    image,
    setImage,
    fetchData,
    handelUpdate,
    handelDelete,
  } = usePostsForm();

  useEffect(() => {
    if (updatePostsId) {
      fetchData(updatePostsId);
    }
  }, [updatePostsId]);

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (updatePostsId) {
      await handelUpdate();
    } else {
      await handelCreate();
    }

    console.log("Submit");
  };

  return (
    <main className="w-full p-6  flex flex-col gap-3 from-black via-[#071b3e] to-black">
      <div className="flex gap-5 items-center">
        {updatePostsId && (
          <div className="flex">
            <h3 className="text-white bg-orange-500 px-4 py-2 rounded-full text-xs font-bold">
              UPDATE
            </h3>
          </div>
        )}
        {!updatePostsId && (
          <div className="flex">
            <h3 className="text-white bg-green-500 px-4 py-2 rounded-full text-xs font-bold">
              CREATE
            </h3>
          </div>
        )}
        <h1 className="font-bold text-white">Posts | Form</h1>
      </div>
      <section className="flex">
        <form
          onSubmit={handelSubmit}
          className="flex flex-col gap-2 bg-gray-200 rounded-xl p-7 w-[500px]"
        >
          <div className="flex flex-col gap-2">
            <label className="text-sm">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              className="px-4 py-2 rounded-full border bg-gray-50 outline-none "
              placeholder="Enter Title"
              type="text"
              onChange={(e) => {
                handelData("title", e.target.value);
              }}
              value={data?.title}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm">
              Posts Slug <span className="text-red-500">*</span>
            </label>
            <input
              className="px-4 py-2 rounded-full border bg-gray-50 outline-none"
              placeholder="Enter Posts Slug"
              type="text"
              disabled={updatePostsId}
              onChange={(e) => {
                handelData("slug", e.target.value);
              }}
              value={data?.slug}
              required
            />
          </div>

          <SelectCategory />

          <SelectAuthor/>

          {data?.imageURL && (
            <div>
              <img className="h-40" src={data?.imageURL} alt="" />
            </div>
          )}
          {image && (
            <div>
              <img className="h-40" src={URL.createObjectURL(image)} alt="" />
            </div>
          )}
          <div className="flex flex-col gap-2">
            <label className="text-sm">Image</label>
            <input
              className="px-4 py-2 rounded-full border bg-gray-50"
              type="file"
              accept="image"
              onChange={(e) => {
                e.preventDefault();
                setImage(e.target.files[0]);
              }}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {!isDone && (
            <button
              type="submit"
              disabled={isLoading || isDone}
              className="bg-blue-500 rounded-xl px-4 py-2 text-white "
            >
              {isLoading ? "Loading..." : updatePostsId ? "Update" : "Create"}
            </button>
          )}
          {updatePostsId && !isDone && (
            <button
              onClick={(e) => {
                e.preventDefault();
                handelDelete(updatePostsId);
              }}
              type="submit"
              disabled={isLoading || isDone}
              className="bg-red-500 rounded-xl px-4 py-2 text-white "
            >
              {isLoading ? "Loading..." : "Delete"}
            </button>
          )}
          {isDone && (
            <h3 className="text-green-500 font-bold text-center">
              Succesfully {updatePostsId ? "Updated" : "Created"} !
            </h3>
          )}
        </form>
        <div className="mx-5">
        <RTEField/>
        </div>
      </section>
      
    </main>
  );
};

function SelectCategory() {
  const { data, handelData } = usePostsForm();

  const { data: categories } = useCategories();

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm">Category</label>
      <select
        className="px-4 py-2 rounded-full border bg-gray-50 outline-none"
        name="category"
        id="category"
        value={data?.categoryId}
        onChange={(e) => {
         
          handelData( "categoryId", e.target.value)
        }}
        required
      >
        <option value="">Select Category</option>
        {categories &&
          categories?.map((item) => {
            return <option value={item?.id}>{item?.name}</option>;
          })}
      </select>
    </div>
  );
}

function SelectAuthor() {
  const { data, handelData } = usePostsForm();

  const { data: authors } = useAuthors();

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm">Author</label>
      <select
        className="px-4 py-2 rounded-full border bg-gray-50 outline-none"
        name="author"
        id="author"
        value={data?.authorId}
        onChange={(e) => {
          handelData("authorId", e.target.value)
        }}
        required
      >
        <option value="">Select Authors</option>
        {authors &&
          authors?.map((item) => {
            return <option value={item?.id}>{item?.name}</option>;
          })}
      </select>
    </div>
  );
}

export default PostsForm;
