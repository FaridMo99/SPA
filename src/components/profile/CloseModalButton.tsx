import { X } from "lucide-react";

type CloseModalButtonProps = {
  ariaLable: string;
  clickHandler: () => void;
};

function CloseModalButton({ ariaLable, clickHandler }: CloseModalButtonProps) {
  return (
    <button
      tabIndex={0}
      type="button"
      className="absolute top-2 border-1 border-gray-300 text-gray-300 cursor-pointer rounded left-2"
      aria-label={ariaLable}
      onClick={clickHandler}
    >
      <X />
    </button>
  );
}

export default CloseModalButton;
