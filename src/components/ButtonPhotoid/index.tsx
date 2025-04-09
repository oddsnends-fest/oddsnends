import React from "react";

const ButtonVariant = ({
  textContent,
  addLayout,
  onClick,
}: {
  textContent: string;
  addLayout: string;
  onClick?: () => void;
}) => {
  return (
    <button onClick={onClick} className={`${addLayout}`}>
      {textContent}
    </button>
  );
};

export default ButtonVariant;
