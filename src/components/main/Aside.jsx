import React from "react";
import { NavLink } from "react-router-dom";
import { ArrowRightToLine, ArrowLeftToLine } from "lucide-react";

function Aside({ paths, asideOpen, setAsideOpen }) {
  function clickHandler() {
    setAsideOpen((pre) => {
      const newVal = !pre;
      sessionStorage.setItem("aside", JSON.stringify(newVal));
      return newVal;
    });
  }

  return (
    <aside
      className={`h-[85vh] ${asideOpen ? "w-[20vw]" : "w-[10vw]"} fixed top-[15vh] left-0 border-r-2 border-r-green-300 bg-gray-50`}
    >
      <nav className="w-full h-full flex flex-col relative justify-evenly items-center font-bold">
        <button
          aria-label={asideOpen ? "Collapse sidebar" : "Expand sidebar"}
          onClick={clickHandler}
          className="absolute top-6 hover:bg-gray-300 p-2 rounded-2xl text-green-300"
        >
          {asideOpen ? <ArrowLeftToLine /> : <ArrowRightToLine />}
        </button>

        {paths?.map((path) => (
          <NavLink
            className={({ isActive }) =>
              `${isActive ? "text-green-300" : ""} hover:bg-gray-300 p-2 rounded-2xl`
            }
            to={path.href}
            key={path.href}
          >
            {asideOpen ? path.name : path.icon}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Aside;
