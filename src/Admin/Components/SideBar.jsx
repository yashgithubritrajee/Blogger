import { Gauge, Layers2, LayoutList, User } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  const link = [
    {
      name: "Dashboard",
      link: "/admin",
      icon: <Gauge />,
    },

    {
      name: "Posts",
      link: "/admin/posts",
      icon: <LayoutList />,
    },
    {
      name: "Categories",
      link: "/admin/categories",
      icon: <Layers2 />,
    },
    {
      name: "Authors",
      link: "/admin/authors",
      icon: <User />,
    },
  ];

  return (
    <section className="w-[200px] border-r h-screen p-6">
      <ul className="w-full flex flex-col gap-7">
        {link.map((item) => {
          return (
            <Link to={item.link} key={item.name}>
              <li className="flex gap-3 items-center bg-blue-50 rounded-full px-5 py-2">
                {item.icon}
                <span className="font-bold">{item.name}</span>
              </li>
            </Link>
          );
        })}
      </ul>
    </section>
  );
};

export default SideBar;
