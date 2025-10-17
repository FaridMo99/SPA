import { createPortal } from "react-dom";
import useAuth from "../../stores/authStore";
import { useQuery } from "@tanstack/react-query";
import type { User } from "../../types/types";
import CustomLoader from "../ui/CustomLoader";
import EditModalContent from "./EditModalContent";
import { useEffect } from "react";
import { getUser } from "../../utils/getUsers";
import ErrorText from "../ui/ErrorText";

function EditModal({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const cachedUser = useAuth((state) => state.user) as User;

  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["edit modal user fetch", cachedUser.username],
    queryFn: () => getUser(cachedUser.username),
  });

  useEffect(() => {
    if (!isError) return;

    const timeoutId = setTimeout(() => {
      setIsOpen(false);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [isError]);

  return createPortal(
    <div
      onClick={(e) => {
        if (e.currentTarget === e.target) {
          setIsOpen(false);
        }
      }}
      className="w-screen h-screen fixed top-0 left-0 overflow-hidden bg-black/50 flex justify-center items-center z-500"
    >
      {isLoading && <CustomLoader size={100} />}
      {(isError || !user) && (
        <div className="w-full h-full justify-center items-center">
          <ErrorText text={error?.message || "Something went wrong..."} />
        </div>
      )}
      {user && !isError && (
        <EditModalContent user={user} setIsOpen={setIsOpen} />
      )}
    </div>,
    document.querySelector("#modal")!,
  );
}

export default EditModal;
