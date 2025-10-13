import { createPortal } from "react-dom";
import { useEffect } from "react";
import { X, CheckCircle2 } from "lucide-react";
import useAuth from "../../stores/authStore";
import Label from "../auth/Label";
import Button from "../auth/Button";
import Input from "../auth/Input";
import { editUserSchema } from "../../schemas/schemas";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import editUser from "../../utils/editUser";
import type z from "zod";

function EditModal({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { user, setUser } = useAuth();
  const safeUser = user!;

  const { handleSubmit, formState, register, watch } = useForm({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      username: safeUser.username,
      bio: safeUser.bio,
      avatar: safeUser.profilePicture,
    },
    mode: "onChange",
  });
  const { errors } = formState;

  const mutation = useMutation({
    mutationKey: ["change info", safeUser],
    mutationFn: editUser,
    onSuccess: (updatedUser) => {
      setTimeout(() => {
        setIsOpen(false);
        setUser(updatedUser);
      }, 800);
    },
  });

  function submitHandler(formData: z.infer<typeof editUserSchema>) {
    mutation.mutate({ data: formData, username: safeUser.username });
  }

  const currentValues = watch();

  const isUnchanged =
    currentValues.username === safeUser.username &&
    currentValues.bio === safeUser.bio &&
    currentValues.avatar === safeUser.avatar;

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return createPortal(
    <div className="w-screen h-screen fixed top-0 left-0 overflow-hidden bg-black/50 flex justify-center items-center z-500">
      <form
        noValidate
        onSubmit={handleSubmit(submitHandler)}
        className="w-1/2 relative h-[68vh] md:w-[38vw] bg-white rounded-2xl outline-1 outline-gray-200 shadow-md shadow-black/20 z-51 flex flex-col justify-evenly items-center"
      >
        <button
          type="button"
          className="absolute top-2 border-1 border-gray-300 text-gray-300 cursor-pointer rounded left-2"
          aria-label="Close Edit"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <X />
        </button>
        <Label id="username" text="Username:" />
        <Input id="username" type="text" {...register("username")} />
        {errors.username && (
          <p className="text-red-400 text-center">{errors.username.message}</p>
        )}
        <Label id="avatar" text="Avatar:" />
        <Input id="avatar" type="text" {...register("avatar")} />
        {errors.avatar && (
          <p className="text-red-400 text-center">{errors.avatar.message}</p>
        )}
        <Label id="bio" text="Bio:" />
        <textarea
          {...register("bio")}
          rows={4}
          id="bio"
          className="border-2 border-gray-300 rounded-lg outline-0 focus:shadow-md pl-1"
        />
        <Button
          type="submit"
          text="Edit"
          disabled={!formState.isValid || mutation.isPending || isUnchanged}
        />
      </form>
      {mutation.isSuccess && (
        <SuccessScreen animation="animate-ping" Icon={CheckCircle2} />
      )}
    </div>,
    document.querySelector("#userModal")!,
  );
}

export default EditModal;

//usually i would use a file input type to change profile picture but msw doenst support it
//doesnt support this so here i am using a url to consume later in the frontend
