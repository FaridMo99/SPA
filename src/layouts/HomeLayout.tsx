import { Outlet } from "react-router-dom";
import CreatePostField from "../components/home/CreatePostField";
import Navbar from "../components/profile/Navbar";

function HomeLayout() {
  return (
    <>
      <CreatePostField />
      <Navbar
        links={[
          { href: "/home", name: "For You" },
          { href: "/home/follow", name: "Follow" },
        ]}
      />
      <Outlet />
    </>
  );
}

export default HomeLayout;
