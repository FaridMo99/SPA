import UserImage from "../ui/UserImage";
import type { Avatar } from "../main/Header";
import { NavLink, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteChat } from "../../utils/chatHandlers";
import { useState } from "react";
import ModalWrapper from "../profile/ModalWrapper";
import CloseModalButton from "../profile/CloseModalButton";
import Button from "../auth/Button";
import CustomLoader from "../ui/CustomLoader";
import toast from "react-hot-toast";
import { ImageIcon } from "lucide-react";

type ChatPreviewTypes = {
  profilePicture: Avatar;
  oppositeUserUsername: string;
  mostRecentMessage: string | null;
  senderMostRecentMessage: string;
  chatId: string;
  countUnreadMessages: number;
  mostRecentMessageType: "GIF" | "TEXT" | "";
};

function ChatPreview({
  profilePicture,
  oppositeUserUsername,
  mostRecentMessage,
  senderMostRecentMessage,
  chatId,
  countUnreadMessages,
  mostRecentMessageType,
}: ChatPreviewTypes) {
  const [isDeleteOpen, setDeleteOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteChat(chatId),
    mutationKey: ["delete chat", chatId],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get all chats"] });
      navigate("/messages");
      toast.success("Deleted Chat successfully!");
      setDeleteOpen(false);
      console.log("success");
    },
    onError: () => {
      toast.error("Something went wrong...");
    },
  });

  return (
    <div className="w-full min-h-22 mb-2 relative">
      <NavLink
        onClick={(e) => {
          if (isDeleteOpen) return e.preventDefault();
        }}
        to={`/messages/${chatId}`}
        className={({ isActive }) =>
          `flex w-full items-center rounded-md transition
     hover:bg-neutral-300 dark:hover:bg-neutral-900 z-50
     px-2 mb-2 h-full 
     ${isActive ? "bg-neutral-300 dark:bg-neutral-900" : ""}`
        }
      >
        <UserImage img={profilePicture} styles="w-10 h-10 mr-2 flex-shrink-0" />

        <div className="flex flex-col h-full min-w-0 justify-evenly py-1">
          <p className="text-green-400 dark:text-dark-green font-bold truncate w-full mb-1 flex-shrink-0">
            @{oppositeUserUsername}
          </p>
          <p className="flex w-full overflow-hidden">
            <span className="font-bold truncate max-w-[50%] mr-1">
              {senderMostRecentMessage}
            </span>
            <span
              className={`truncate flex-grow ${!mostRecentMessage ? "text-neutral-500 italic" : ""}`}
            >
              {!mostRecentMessage && "Not Found"}
              {mostRecentMessage &&
                mostRecentMessageType &&
                mostRecentMessageType === "GIF" && <ImageIcon />}
              {mostRecentMessage &&
                mostRecentMessageType &&
                mostRecentMessageType === "TEXT" &&
                mostRecentMessage}
            </span>
          </p>
        </div>
        {countUnreadMessages > 0 && (
          <p className="rounded-full bg-red-500 absolute -top-1 -right-1 flex justify-center items-center w-5 h-5">
            {countUnreadMessages! > 99 ? "99+" : countUnreadMessages}
          </p>
        )}

        {isDeleteOpen && (
          <ModalWrapper setIsOpen={setDeleteOpen}>
            <CloseModalButton
              clickHandler={() => setDeleteOpen(false)}
              ariaLable="Close Delete Dialog"
            />
            <div className="w-1/2 relative h-[20vh] md:w-[30vw] dark:bg-dark-gray bg-white rounded-2xl outline-1 outline-gray-200 shadow-md shadow-black/20 z-51 flex flex-col justify-evenly items-center">
              <p>Are you sure you want to delete the Chat?</p>
              <div className="flex justify-between items-center w-1/4">
                <Button
                  type="button"
                  disabled={isPending}
                  text="No"
                  clickHandler={() => setDeleteOpen(false)}
                />
                <Button
                  type="button"
                  disabled={isPending}
                  text={isPending ? <CustomLoader /> : "Yes"}
                  clickHandler={mutate}
                />
              </div>
            </div>
          </ModalWrapper>
        )}
      </NavLink>
      {!isDeleteOpen && (
        <button
          aria-label="open delete"
          type="button"
          className="absolute top-0 w-6 h-4 flex justify-center items-center right-2 font-bold text-neutral-500 hover:text-neutral-700 z-100"
          onClick={() => {
            setDeleteOpen(true);
          }}
        >
          ...
        </button>
      )}
    </div>
  );
}

export default ChatPreview;
