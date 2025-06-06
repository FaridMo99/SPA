import React from "react";

function PostCardIcons({
  Icon,
  ariaLabel,
  pClassName,
  iconClassName,
  text,
  onClick,
}) {
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
