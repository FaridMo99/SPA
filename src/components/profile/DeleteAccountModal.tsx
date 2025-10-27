import React from "react";
import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../../utils/editUser";
import toast from "react-hot-toast";
import Button from "../auth/Button";
import { useNavigate } from "react-router-dom";
import CustomLoader from "../ui/CustomLoader";
import CloseModalButton from "./CloseModalButton";
import ModalWrapper from "./ModalWrapper";

type DeleteAccountModal = {
  username: string;
  setDeleteIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function DeleteAccountModal({ username, setDeleteIsOpen }: DeleteAccountModal) {
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationKey: ["delete user", username],
    mutationFn: () => deleteUser(username),
    onSuccess: () => {
      navigate("/login");
      toast.success("Account Deleted!");
      sessionStorage.clear();
      localStorage.clear();
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  return (
    <ModalWrapper setIsOpen={setDeleteIsOpen}>
      <div className="w-1/2 relative h-[20vh] pt-2 md:w-[30vw] dark:bg-dark-gray bg-white rounded-2xl outline-1 outline-gray-200 shadow-md shadow-black/20 z-51 flex flex-col justify-evenly items-center">
        <CloseModalButton
          clickHandler={() => setDeleteIsOpen(false)}
          ariaLable="Close Delete Dialog"
        />
        <p>Are you sure you want to delete your Account?</p>
        <div className="flex justify-center items-center w-full">
          <Button
            disabled={isPending}
            text="No"
            clickHandler={() => setDeleteIsOpen(false)}
          />
          <Button
            styles="ml-2"
            disabled={isPending}
            text={isPending ? <CustomLoader /> : "Yes"}
            clickHandler={() => mutate()}
          />
        </div>
      </div>
    </ModalWrapper>
  );
}

export default DeleteAccountModal;
