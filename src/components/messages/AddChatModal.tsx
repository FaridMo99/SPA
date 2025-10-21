import { useState } from "react";
import ModalWrapper from "../profile/ModalWrapper";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useDebounce from "../../hooks/useDebounce";
import { searchUsers } from "../../utils/getUsers";
import CustomLoader from "../ui/CustomLoader";
import ErrorText from "../ui/ErrorText";
import UserImage from "../ui/UserImage";
import NotFound from "../ui/NotFound";
import { Plus } from "lucide-react";
import { createChat } from "../../utils/chatHandlers";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useSocket from "../../stores/socketStore";

type AddChatModalProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function AddChatModal({ setIsOpen }: AddChatModalProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState<string>("");
  const debouncedSearch: string = useDebounce(search, 600);
  const joinChat = useSocket((state) => state.joinChat);

  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["search for chat", debouncedSearch],
    queryFn: () => searchUsers(debouncedSearch),
    enabled: debouncedSearch.trim().length > 0,
  });
  const { mutate } = useMutation({
    mutationKey: ["create chat"],
    mutationFn: (userTwoUsername: string) => createChat(userTwoUsername),
    onSuccess: (chat) => {
      joinChat(chat.id);
      if (!chat.alreadyExists) {
        toast.success("Chat created");
      }
      navigate(`/messages/${chat.id}`);
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: ["get all chats"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return (
    <ModalWrapper setIsOpen={setIsOpen}>
      <section className="w-1/2 relative min-h-[20vh] max-h-[80vh] md:w-[30vw] dark:bg-dark-gray bg-white rounded-2xl outline-1 outline-gray-200 shadow-md shadow-black/20 z-51 overflow-clip flex flex-col items-center">
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          className="dark:bg-neutral-900 focus:outline-green-400 dark:focus:outline-dark-green bg-neutral-500 rounded-lg placeholder:pl-2 w-2/3 md:w-1/2 md:h-8 mt-6 mb-10"
          placeholder="search..."
        />
        <ul className="w-full flex flex-col items-center justify-evenly overflow-scroll">
          {isLoading && <CustomLoader size={40} />}
          {isError && <ErrorText text="Something went wrong..." />}
          {!isLoading && !isError && users?.length === 0 && (
            <NotFound text="No Users found..." />
          )}
          {!isLoading &&
            !isError &&
            users &&
            users?.length > 0 &&
            users?.map((user) => (
              <li
                key={user.username}
                className="w-full flex justify-between items-center px-10 py-5 hover:bg-gray-500"
              >
                <UserImage
                  styles="w-8 h-8 md:w-10 md:h-10"
                  img={user.profilePicture}
                />
                <Link to={`/${user.username}`} className="overflow-ellipsis">
                  {user.username}
                </Link>
                <button
                  onClick={() => mutate(user.username)}
                  className="dark:bg-neutral-700 bg-neutral-400 rounded-full p-2 hover:brightness-110 cursor-pointer"
                >
                  <Plus />
                </button>
              </li>
            ))}
        </ul>
      </section>
    </ModalWrapper>
  );
}

export default AddChatModal;
