import { createPortal } from "react-dom";
import { X, CheckCircle2 } from "lucide-react";
import useAuth from "../../stores/authStore";
import Label from "../auth/Label";
import Button from "../auth/Button";
import Input from "../auth/Input";
import editUser from "../../utils/editUser";
import editSchema from "../../schemas/editSchema";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SuccessScreen from "../auth/SuccessScreen";
import login from "../../utils/login";

function EditModal({ setIsOpen }) {
  const user = useAuth((state) => state.user);

  const { handleSubmit, formState, register, watch } = useForm({
    resolver: zodResolver(editSchema),
    defaultValues: {
      username: user.username,
      bio: user.bio,
      avatar: user.avatar,
    },
    mode: "onChange",
  });
  const { errors } = formState;

  const mutation = useMutation({
    mutationKey: ["change info", user],
    mutationFn: (data) => editUser(data, user.username),
  });

  function submitHandler(formData) {
    const submitData = { ...user, ...formData };

    mutation.mutate(submitData, {
      onSuccess: () => {
        setTimeout(() => {
          login(submitData);
        }, 800);
      },
    });
  }

  const currentValues = watch();

  const isUnchanged =
    currentValues.username === user.username &&
    currentValues.bio === user.bio &&
    currentValues.avatar === user.avatar;

  return createPortal(
    <div className="w-screen h-screen absolute top-0 left-0 overflow-hidden bg-black/50 flex justify-center items-center z-50">
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
          rows="4"
          id="bio"
          className="border-2 border-gray-300 rounded-lg outline-0 focus:shadow-md pl-1"
        />
        <Button
          type="submit"
          text="Edit"
          disabled={!formState.isValid || mutation.isLoading || isUnchanged}
        />
      </form>
      {mutation.isSuccess && (
        <SuccessScreen animation="animate-ping" Icon={CheckCircle2} />
      )}
    </div>,
    document.querySelector("#userModal"),
  );
}

export default EditModal;

//usually i would use a file input type to change profile picture but mockapi.io
//doesnt support this so here i am using a url to consume later in the frontend

//the api doesnt support PATCH request so i am using a PUT request here
