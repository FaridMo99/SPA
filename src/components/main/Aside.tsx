import { NavLink } from "react-router-dom";
import {
  ArrowRightToLine,
  ArrowLeftToLine,
  LogOut,
  type LucideIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Dispatch, SetStateAction } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAuth from "../../stores/authStore";
import { logout } from "../../utils/logout";
import { getAllUnreadMessagesCount } from "../../utils/chatHandlers";
import useSocket from "../../stores/socketStore";

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
  const { user, clearUser } = useAuth((state) => state);
  const messagesReceived = useSocket((state) => state.messagesReceived);
  const {
    data: count,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["get unread message count", messagesReceived],
    queryFn: getAllUnreadMessagesCount,
  });

  //onsuccess navigate, clear user
  const { isPending, mutate, isSuccess } = useMutation({
    mutationKey: ["logout", user?.username],
    mutationFn: logout,
    onSuccess: () => {
      navigate("/login");
      toast.success("Logout successful!");
      sessionStorage.removeItem("search");
      localStorage.removeItem("aside");
      clearUser();
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  function clickHandler() {
    setAsideOpen((pre) => {
      const newVal = !pre;
      localStorage.setItem("aside", JSON.stringify(newVal));
      return newVal;
    });
  }

  return (
    <aside
      className={`h-[85vh] ${asideOpen ? "md:w-[15vw] w-[25vw]" : "md:w-[10vw] w-[15vw]"} fixed top-[15vh] left-0 border-r-2 border-r-green-300 dark:border-r-dark-green bg-gray-50 dark:bg-dark-gray z-10`}
    >
      <nav
        aria-label="Page Navigation"
        className="w-full h-full flex flex-col relative justify-evenly items-center font-bold"
      >
        <button
          tabIndex={0}
          aria-label={asideOpen ? "Collapse sidebar" : "Expand sidebar"}
          onClick={clickHandler}
          className="absolute top-6 hover:bg-gray-300 p-2 rounded-2xl text-green-300 dark:text-dark-green dark:hover:bg-gray-600 hover:cursor-pointer"
        >
          {asideOpen ? <ArrowLeftToLine /> : <ArrowRightToLine />}
        </button>

        {paths?.map((path) => (
          <NavLink
            className={({ isActive }) =>
              `${isActive ? "text-green-300 dark:text-dark-green" : ""} hover:bg-gray-300 dark:hover:bg-gray-600 p-2 rounded-2xl relative`
            }
            to={path.href}
            key={path.href}
            aria-label={path.name}
          >
            {path.name === "Messages" &&
              !isLoading &&
              !isError &&
              count! > 0 && (
                <p className="rounded-full bg-red-500 absolute -top-1 -right-1 flex justify-center items-center w-5 h-5">
                  {count! > 99 ? "99+" : count}
                </p>
              )}
            {asideOpen ? path.name : <path.icon />}{" "}
          </NavLink>
        ))}
        <button
          tabIndex={0}
          type="button"
          aria-label="log out"
          disabled={isPending || isSuccess}
          onClick={() => mutate()}
          className="hover:bg-gray-300 dark:hover:bg-gray-600 p-2 rounded-2xl hover:cursor-pointer"
        >
          {asideOpen ? <p>Logout</p> : <LogOut />}
        </button>
      </nav>
    </aside>
  );
}

export default Aside;
