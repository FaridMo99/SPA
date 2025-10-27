import { useTheme } from "next-themes";
import Button from "../auth/Button";
import { Moon, Settings, Sun, Trash2 } from "lucide-react";

type ImageSectionButtonSectionProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function ImageSectionButtonSection({
  setIsOpen,
  setDeleteIsOpen,
}: ImageSectionButtonSectionProps) {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <Button
        ariaLabel="toggle theme"
        styles="absolute top-2 right-2 md:px-8"
        clickHandler={() => {
          setTheme((pre) => (pre === "dark" ? "light" : "dark"));
        }}
        text={
          theme === "dark" ? (
            <Moon className="text-dark-green" />
          ) : (
            <Sun className="text-green-400" />
          )
        }
      />
      <Button
        ariaLabel="edit account"
        styles="absolute top-15 right-2 md:px-8"
        text={<Settings />}
        clickHandler={() => setIsOpen(true)}
      />
      <Button
        ariaLabel="delete account"
        clickHandler={() => setDeleteIsOpen(true)}
        styles="text-red-500 absolute top-28 right-2 md:px-8"
        text={<Trash2 />}
      />
    </div>
  );
}

export default ImageSectionButtonSection;
