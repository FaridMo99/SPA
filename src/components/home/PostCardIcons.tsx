import type { LucideIcon } from "lucide-react";

type PostCardIconsProps = {
  Icon: LucideIcon;
  ariaLabel: string;
  pClassName: string;
  iconClassName: string;
  text: number;
  onClick?: () => void;
  disabled?: boolean;
};

function PostCardIcons({
  Icon,
  ariaLabel,
  pClassName,
  iconClassName,
  text,
  onClick,
  disabled = false,
}: PostCardIconsProps) {
  return (
    <button
      tabIndex={0}
      type="button"
      aria-label={ariaLabel}
      className="flex items-center"
      onClick={onClick}
      disabled={disabled}
    >
      <Icon size={40} className={iconClassName} />
      <p className={pClassName}>{text}</p>
    </button>
  );
}

export default PostCardIcons;
