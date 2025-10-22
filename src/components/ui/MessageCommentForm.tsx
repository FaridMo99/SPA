import { Send } from "lucide-react";
import CustomLoader from "./CustomLoader";
import { useEffect, type FormEvent } from "react";
import { useLocation } from "react-router-dom";

type MessageCommentFormProps = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  submitHandler: (e: FormEvent<HTMLFormElement>) => void;
  isPending: boolean;
  ariaLabel: string;
  placeholder: string;
};

const buttonStyles: string =
  "bg-green-300 text-white rounded-3xl p-2 mr-2 font-bold hover:bg-gray-300 hover:text-green-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:hover:bg-gray-100 disabled:hover:text-gray-400 absolute right-1 bottom-1 dark:enabled:bg-dark-green enabled:hover:brightness-105";

const formStyles: string =
  "w-full outline-1 bg-gray-50 dark:outline-black outline-gray-300 fixed bottom-0 right-0 flex items-center justify-center py-2 px-4 dark:bg-dark-gray dark:brightness-120";

function MessageCommentForm({
  value,
  setValue,
  submitHandler,
  isPending,
  ariaLabel,
  placeholder,
}: MessageCommentFormProps) {
  const location = useLocation();

  useEffect(() => {
    setValue("");
  }, [location]);

  return (
    <form onSubmit={submitHandler} className={formStyles}>
      <input
        type="text"
        className="resize-none bg-white focus:outline-green-300 dark:bg-dark-gray dark:focus:outline-dark-green w-1/3 p-2 rounded-md dark:brightness-80 h-1/10"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        className={buttonStyles}
        type="submit"
        disabled={value.trim().length === 0 || isPending}
        aria-label={ariaLabel}
      >
        {isPending ? <CustomLoader /> : <Send />}
      </button>
    </form>
  );
}

export default MessageCommentForm;
