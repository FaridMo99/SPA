import React, { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost, createPostImage } from "../../utils/createPost";
import toast from "react-hot-toast";
import useAuth from "../../stores/authStore";
import type { User } from "../../types/types";
import { imageSchema } from "../../schemas/schemas";
import ImagePreview from "./ImagePreview";
import ButtonSection from "./ButtonSection";

function CreatePostField() {
  const fileRef = useRef<null | HTMLInputElement>(null);
  const [textInput, setTextInput] = useState<string>("");
  const [fileInput, setFileInput] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const user = useAuth((state) => state.user) as User;
  const queryClient = useQueryClient();

  //text mutation
  const { mutate: textSubmit, isPending } = useMutation({
    mutationFn: (data: { content: string }) => createPost(data),
    mutationKey: ["create Post", textInput],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get fyp posts"] });
      queryClient.invalidateQueries({
        queryKey: ["get User posts", user.username],
      });
      setTextInput("");
      toast.success("Successfully posted");
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  //file mutation
  const { mutate: fileSubmit, isPending: fileIsPending } = useMutation({
    mutationFn: createPostImage,
    mutationKey: ["create Post", fileInput],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get fyp posts"] });
      queryClient.invalidateQueries({
        queryKey: ["get User posts", user.username],
      });
      setFileInput(null);
      setPreview("");
      toast.success("Successfully posted");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (textInput && !fileInput) {
      textSubmit({ content: textInput.trim() });
    }

    if (!textInput && fileInput) {
      fileSubmit(fileInput);
    }
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

  //cleanup effect for object urls to avoid memory leaks
  useEffect(() => {
    if (!preview) {
      return;
    }
    return () => URL.revokeObjectURL(preview);
  }, [preview]);

  return (
    <section
      aria-label="Create Post"
      className="w-full min-h-[20vh] bg-white dark:bg-dark-gray"
    >
      <form
        onSubmit={submitHandler}
        className="w-full h-full flex flex-col justify-center in-checked:"
      >
        {!preview && (
          <textarea
            value={textInput}
            disabled={fileInput !== null}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void => {
              setTextInput(e.target.value);
            }}
            rows={5}
            placeholder={fileInput ? "" : "Tell us..."}
            className="bg-white w-full font-bold resize-none  dark:bg-dark-gray"
          />
        )}
        <input
          ref={fileRef}
          accept="image/*"
          type="file"
          onChange={handleFileChange}
          className="hidden"
        />
        {preview && (
          <ImagePreview
            setFileInput={setFileInput}
            setPreview={setPreview}
            preview={preview}
            fileRef={fileRef}
          />
        )}
        <ButtonSection
          isPending={isPending}
          fileIsPending={fileIsPending}
          textInput={textInput}
          fileInput={fileInput}
          fileRef={fileRef}
        />
      </form>
    </section>
  );
}

export default CreatePostField;
