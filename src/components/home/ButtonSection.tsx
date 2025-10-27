import { Paperclip } from "lucide-react";
import CustomLoader from "../ui/CustomLoader";

type ButtonSectionProps = {
  isPending: boolean;
  fileIsPending: boolean;
  textInput: string;
  fileInput: File | null;
  fileRef: React.RefObject<HTMLInputElement | null>;
};

function ButtonSection({
  isPending,
  fileIsPending,
  textInput,
  fileInput,
  fileRef,
}: ButtonSectionProps) {
  return (
    <div className="border-y-black/10 dark:border-black border-y-2 w-full h-1/3 flex items-center justify-end">
      <button
        aria-label="Select image to post"
        className="bg-green-300 text-white rounded-3xl p-2 w-16 md:w-18 h-3/4 mr-2 font-bold disabled:bg-gray-100 disabled:text-gray-400 dark:bg-dark-green dark:disabled:bg-gray-100 dark:disabled:text-gray-400 enabled:hover:brightness-110 dark:enabled:hover:brightness-110 flex justify-center items-center"
        onClick={() => fileRef.current?.click()}
        type="button"
        disabled={fileIsPending}
      >
        <Paperclip />
      </button>
      <button
        disabled={
          (textInput.trim().length === 0 && fileInput === null) ||
          isPending ||
          fileIsPending
        }
        className="bg-green-300 text-white rounded-3xl p-2 w-16 md:w-18 h-3/4 mr-2 font-bold disabled:bg-gray-100 disabled:text-gray-400 dark:bg-dark-green dark:disabled:bg-gray-100 dark:disabled:text-gray-400 enabled:hover:brightness-110 dark:enabled:hover:brightness-110 flex justify-center items-center"
        type="submit"
      >
        {isPending || fileIsPending ? <CustomLoader /> : "Post"}
      </button>
    </div>
  );
}

export default ButtonSection;
