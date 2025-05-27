import React from "react";
import { NavLink } from "react-router-dom";

function Aside({ paths }) {
  return (
    <aside className="h-[85vh] w-[20vw] fixed top-[15vh] left-0 border-r-2 border-r-green-300 bg-gray-50">
      <nav className="w-full h-full flex flex-col  justify-evenly items-center font-bold">
        {paths?.map((path) => (
          <NavLink
            className={({ isActive }) => (isActive ? " text-green-300" : "")}
            to={path.href}
            key={path.href}
          >
            {path.name}
            {path.icon}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Aside;
