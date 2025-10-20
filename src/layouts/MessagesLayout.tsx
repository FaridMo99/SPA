import { Outlet } from "react-router-dom";
import ChatNavbar from "../components/messages/ChatNavbar";

function MessagesLayout() {
  return (
    <section className="flex">
      <ChatNavbar />
      <Outlet />
    </section>
  );
}

export default MessagesLayout;
