import type { LucideIcon } from "lucide-react";

type PostCardIconsProps = {
  Icon: LucideIcon;
  ariaLabel: string;
  pClassName: string;
  iconClassName: string;
  text: number;
  onClick?: () => void;
};

function PostCardIcons({
  Icon,
  ariaLabel,
  pClassName,
  iconClassName,
  text,
  onClick,
}: PostCardIconsProps) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className="flex items-center"
      onClick={onClick}
    >
      <Icon size={null} className={iconClassName} />
      <p className={pClassName}>{text}</p>
    </button>
  );
}

export default PostCardIcons;
