import React from "react";
import { Link } from "react-router-dom";
import { useAuthors } from "../../../lib/firebase/author/read";

const AuthorsListView = () => {
    
  const { data, error, isLoading } = useAuthors();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }
  if (!data) {
    return <h1>Data not found</h1>;
  }

  return (
    <section>
      <table className="w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2 bg-blue-50">Sr.</th>
            <th className="border px-4 py-2 bg-blue-50">Photo</th>
            <th className="border px-4 py-2 bg-blue-50">Name</th>
            <th className="border px-4 py-2 bg-blue-50">Email</th>
            <th className="border px-4 py-2 bg-blue-50">Action </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, key) => {
            return (
              <tr key={item.name}>
                <td className="border px-4 py-2 text-white ">{key + 1}</td>
                <td className="border px-4 py-2">
                  {" "}
                  <img className="h-20" src={item?.photoURL} alt="" />
                </td>
                <td className="border px-4 py-2 text-white">{item?.name}</td>
                <td className="border px-4 py-2 text-white">{item?.email}</td>
                <td className="border px-4 py-2 ">
                  <Link to={`/admin/authors/authorform?id=${item?.id}`}>
                    <button className="bg-blue-500 text-white rounded-full px-3 py-1 text-sm">
                      Action
                    </button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default AuthorsListView;
