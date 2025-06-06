import React from "react";

function PostCardIcons({
  Icon,
  ariaLabel,
  setHovered,
  pClassName,
  iconClassName,
  text,
  hoverKey,
  onClick,
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className="flex items-center"
      onMouseEnter={() => setHovered(hoverKey)}
      onMouseLeave={() => setHovered(null)}
      onClick={onClick}
    >
      <Icon size={null} className={iconClassName} />
      <p className={pClassName}>{text}</p>
    </button>
  );
}

export default PostCardIcons;
