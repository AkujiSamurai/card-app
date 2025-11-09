import React from "react";

interface IconButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: React.ReactNode;
  title?: string;
}

export default function IconButton({
  onClick,
  children,
  title,
}: IconButtonProps) {
  return (
    <button className="icon-btn" onClick={onClick} title={title}>
      {children}
    </button>
  );
}
