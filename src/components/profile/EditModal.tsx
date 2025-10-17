import useAuth from "../../stores/authStore";
import { useQuery } from "@tanstack/react-query";
import type { User } from "../../types/types";
import CustomLoader from "../ui/CustomLoader";
import EditModalContent from "./EditModalContent";
import { useEffect } from "react";
import { getUser } from "../../utils/getUsers";
import ErrorText from "../ui/ErrorText";
import ModalWrapper from "./ModalWrapper";

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
  }, [isError, setIsOpen]);

  return (
    <ModalWrapper setIsOpen={setIsOpen}>
        {isLoading && <CustomLoader size={100} />}
        {(isError || !user) && (
          <div className="w-full h-full justify-center items-center">
            <ErrorText text={error?.message || "Something went wrong..."} />
          </div>
        )}
        {user && !isError && (
          <EditModalContent user={user} setIsOpen={setIsOpen} />
        )}
    </ModalWrapper>
  );
}

export default EditModal;
