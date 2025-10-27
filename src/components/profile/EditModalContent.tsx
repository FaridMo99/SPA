import React, { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editUserSchema, imageSchema } from "../../schemas/schemas";
import Fieldset from "../auth/Fieldset";
import Label from "../auth/Label";
import Button from "../auth/Button";
import editUser, { type EditFields } from "../../utils/editUser";
import toast from "react-hot-toast";
import type { User } from "../../types/types";
import CustomLoader from "../ui/CustomLoader";
import useAuth from "../../stores/authStore";
import CloseModalButton from "./CloseModalButton";
import UserImage from "../ui/UserImage";

type EditModalContentProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
};

//had to use a seperate ref for the file upload since rhf wont let me access the ref it uses under the hood to trigger the click through the image for a preview
function EditModalContent({ setIsOpen, user }: EditModalContentProps) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [fileInput, setFileInput] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

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
    },
    mode: "onChange",
  });
  const { errors, isDirty } = formState;

  function submitHandler(formData: EditFields) {
    if (fileInput) {
      formData.profilePicture = fileInput;
    }
    mutate(formData);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const result = imageSchema.safeParse(file);

    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }

    setFileInput(file);
    setPreview(URL.createObjectURL(file));
  }

  useEffect(() => {
    if (!preview) {
      return;
    }
    return () => URL.revokeObjectURL(preview);
  }, [preview]);

  return (
    <form
      noValidate
      onSubmit={handleSubmit(submitHandler)}
      className="w-1/2 relative md:h-[68vh] h-[55vh] py-6 md:w-[38vw] dark:bg-dark-gray bg-white rounded-2xl outline-1 outline-gray-200 shadow-md shadow-black/20 z-51 flex flex-col justify-evenly items-center"
    >
      <CloseModalButton
        clickHandler={() => setIsOpen(false)}
        ariaLable="Close Edit"
      />
      <Fieldset
        register={register}
        id="username"
        text="Username:"
        type="text"
      />
      {errors.username && (
        <p className="text-red-500 text-center">{errors.username.message}</p>
      )}
      <fieldset className="flex flex-col w-2/3 md:w-1/3">
        <Label text="Profile Picture:" id="profilePicture" />
        <div
          onClick={() => fileRef.current?.click()}
          className="flex justify-center items-center"
        >
          <UserImage
            img={preview ? preview : user.profilePicture}
            styles="self-center mt-2 hover:brightness-120 cursor-pointer"
          />
        </div>
        <input
          onChange={handleFileChange}
          ref={fileRef}
          className="hidden"
          type="file"
          id="profilePicture"
          name="profilePicture"
          accept="image/*"
        />
      </fieldset>
      {errors.profilePicture && (
        <p className="text-red-500 text-center">
          {errors.profilePicture.message}
        </p>
      )}
      <fieldset className="flex flex-col w-2/3 md:w-1/3">
        <Label id="bio" text="Bio:" />
        <textarea
          {...register("bio")}
          rows={4}
          id="bio"
          className="border-2 border-gray-300 w-full rounded-lg outline-0 focus:shadow-md pl-1"
        />
      </fieldset>
      {errors.bio && (
        <p className="text-red-500 text-center">{errors.bio.message}</p>
      )}
      <div className="flex justify-center items-center">
        <Button
          type="submit"
          text={isPending ? <CustomLoader /> : "Edit"}
          disabled={isPending || (!isDirty && !preview)}
        />
      </div>
    </form>
  );
}

export default EditModalContent;
