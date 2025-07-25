import { NavLink } from "react-router-dom";
import {
  ArrowRightToLine,
  ArrowLeftToLine,
  LogOut,
  type LucideIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Dispatch, SetStateAction } from "react";

type Path = {
  href: string;
  name: string;
  icon: LucideIcon;
};

export type AsideProps = {
  paths: Path[];
  asideOpen: boolean;
  setAsideOpen: Dispatch<SetStateAction<boolean>>;
};

function Aside({ paths, asideOpen, setAsideOpen }: AsideProps) {
  const navigate = useNavigate();
  function clickHandler() {
    setAsideOpen((pre) => {
      const newVal = !pre;
      sessionStorage.setItem("aside", JSON.stringify(newVal));
      return newVal;
    });
  }
  async function logoutHandler(): Promise<void> {
    sessionStorage.removeItem("search");
    sessionStorage.removeItem("aside");
    sessionStorage.removeItem("username");
    navigate("/login");
  }

  return (
    <aside
      className={`h-[85vh] ${asideOpen ? "w-[20vw]" : "w-[10vw]"} fixed top-[15vh] left-0 border-r-2 border-r-green-300 bg-gray-50 z-10`}
    >
      <nav
        aria-label="Page Navigation"
        className="w-full h-full flex flex-col relative justify-evenly items-center font-bold"
      >
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
            aria-label={path.name}
          >
            {asideOpen ? path.name : <path.icon />}{" "}
          </NavLink>
        ))}
        <button
          type="button"
          aria-label="log out"
          onClick={logoutHandler}
          className="hover:bg-gray-300 p-2 rounded-2xl"
        >
          {asideOpen ? <p>Logout</p> : <LogOut />}
        </button>
      </nav>
    </aside>
  );
}

export default Aside;
