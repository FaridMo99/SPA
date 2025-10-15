import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editUserSchema } from "../../schemas/schemas";
import Fieldset from "../auth/Fieldset";
import Label from "../auth/Label";
import Input from "../auth/Input";
import Button from "../auth/Button";
import editUser, { type EditFields } from "../../utils/editUser";
import toast from "react-hot-toast";
import type { User } from "../../types/types";
import CustomLoader from "../ui/CustomLoader";
import useAuth from "../../stores/authStore";
import CloseModalButton from "../ui/CloseModalButton";

type EditModalContentProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
};

function EditModalContent({ setIsOpen, user }: EditModalContentProps) {
  const setUser = useAuth((state) => state.setUser);
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["edit user", user],
    mutationFn: (editFields: EditFields) => editUser(user.username, editFields),
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: (user) => {
      setIsOpen(false);
      toast.success("Edit Successful!");
      queryClient.resetQueries();
      setUser(user);
    },
  });

  const { handleSubmit, formState, register } = useForm({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      username: user.username,
      bio: user.bio ?? "",
      profilePicture: user.profilePicture,
    },
    mode: "onChange",
  });
  const { errors, isDirty } = formState;

  function submitHandler(formData: EditFields) {
    mutate(formData);
  }

  return (
      <form
        noValidate
        onSubmit={handleSubmit(submitHandler)}
        className="w-1/2 relative h-[68vh] md:w-[38vw] dark:bg-dark-gray bg-white rounded-2xl outline-1 outline-gray-200 shadow-md shadow-black/20 z-51 flex flex-col justify-evenly items-center"
    >
        <CloseModalButton clickHandler={()=>setIsOpen(false)} ariaLable="Close Edit"/>
        <Fieldset
          register={register}
          id="username"
          text="Username:"
          type="text"
        />
        {errors.username && (
          <p className="text-red-500 text-center">{errors.username.message}</p>
        )}
        <fieldset className="flex flex-col">
          <Label text="Profile Picture:" id="profilePicture" />
          <Input
            type="file"
            id="profilePicture"
            {...register("profilePicture")}
            accept="image/*"
          />
        </fieldset>
        {errors.profilePicture && (
          <p className="text-red-500 text-center">
            {errors.profilePicture.message}
          </p>
        )}
        <fieldset className="flex flex-col w-[180px]">
          <Label id="bio" text="Bio:" />
          <textarea
            {...register("bio")}
            rows={4}
            id="bio"
            className="border-2 border-gray-300 rounded-lg outline-0 focus:shadow-md pl-1"
          />
        </fieldset>
        {errors.bio && (
          <p className="text-red-500 text-center">{errors.bio.message}</p>
        )}
        <div className="flex justify-between items-center w-1/4">
          <Button
            type="submit"
            text={isPending ? <CustomLoader /> : "Edit"}
            disabled={isPending || !isDirty}
          />
        </div>
      </form>
  );
}

export default EditModalContent;
