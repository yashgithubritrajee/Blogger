import React, { useEffect } from "react";
import { useAuthorForm } from "../context/AuthorFormContext";
import { useSearchParams } from "react-router-dom";

const AuthorForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const updateAuthorsId = searchParams.get("id");

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
  } = useAuthorForm();

  useEffect(() => {
    if (updateAuthorsId) {
      fetchData(updateAuthorsId);
    }
  }, [updateAuthorsId]);

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (updateAuthorsId) {
      await handelUpdate();
    } else {
      await handelCreate();
    }

    console.log("Submit");
  };

  return (
    <main className="w-full p-6  flex flex-col gap-3">
      <div className="flex gap-5 items-center">
        {updateAuthorsId && (
          <div className="flex">
            <h3 className="text-white bg-orange-500 px-4 py-2 rounded-full text-xs font-bold">
              UPDATE
            </h3>
          </div>
        )}
        {!updateAuthorsId && (
          <div className="flex">
            <h3 className="text-white bg-green-500 px-4 py-2 rounded-full text-xs font-bold">
              CREATE
            </h3>
          </div>
        )}
        <h1 className="font-bold text-white">Author | Form</h1>
      </div>
      <section className="flex">
        <form
          onSubmit={handelSubmit}
          className="flex flex-col gap-2 bg-gray-200 rounded-xl p-7 w-[500px]"
        >
          <div className="flex flex-col gap-2">
            <label className="text-sm">
              Author Name <span className="text-red-500">*</span>
            </label>
            <input
              className="px-4 py-2 rounded-full border bg-gray-50 outline-none "
              placeholder="Enter Author Name"
              type="text"
              onChange={(e) => {
                handelData("name", e.target.value);
              }}
              value={data?.name}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm">
              Author Email <span className="text-red-500">*</span>
            </label>
            <input
              className="px-4 py-2 rounded-full border bg-gray-50 outline-none"
              placeholder="Enter Author Email"
              type="email"
              onChange={(e) => {
                handelData("email", e.target.value);
              }}
              value={data?.email}
              required
            />
          </div>
          {data?.photoURL && (
            <div>
              <img className="h-40" src={data?.photoURL} alt="" />
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
              {isLoading
                ? "Loading..."
                : updateAuthorsId
                ? "Update"
                : "Create"}
            </button>
          )}
          {updateAuthorsId && !isDone && (
            <button
              onClick={(e) => {
                e.preventDefault();
                handelDelete(updateAuthorsId)
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
              Succesfully {updateAuthorsId ? "Updated" : "Created"} !
            </h3>
          )}
        </form>
      </section>
    </main>
  );
};

export default AuthorForm;
