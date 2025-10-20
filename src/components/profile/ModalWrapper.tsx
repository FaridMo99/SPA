import { useEffect } from "react";
import { createPortal } from "react-dom";

type ModalWrapperType = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
};

function ModalWrapper({ setIsOpen, children }: ModalWrapperType) {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);
  return createPortal(
    <section
      onClick={(e) => {
        if (e.currentTarget === e.target) {
          setIsOpen(false);
        }
      }}
      className="w-screen h-screen fixed top-0 left-0 bg-black/50 flex justify-center items-center z-500"
    >
      {children}
    </section>,
    document.querySelector("#modal")!,
  );
}

export default ModalWrapper;
