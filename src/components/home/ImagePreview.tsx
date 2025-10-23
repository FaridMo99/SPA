import React from "react";
import CloseModalButton from "../profile/CloseModalButton";

interface ImagePreviewProps {
  setFileInput: React.Dispatch<React.SetStateAction<File | null>>;
  setPreview: React.Dispatch<React.SetStateAction<string>>;
  fileRef: React.RefObject<HTMLInputElement | null>;
  preview: string;
}

function ImagePreview({
  setFileInput,
  setPreview,
  fileRef,
  preview,
}: ImagePreviewProps) {
  return (
    <div className="my-2 w-full flex justify-center relative">
      <CloseModalButton
        ariaLable="remove image"
        clickHandler={() => {
          setFileInput(null);
          setPreview("");
          if (fileRef.current) fileRef.current.value = "";
        }}
      />
      <img
        src={preview}
        alt="Preview"
        className="max-h-40 w-auto object-contain rounded-lg"
      />
    </div>
  );
}

export default ImagePreview;
