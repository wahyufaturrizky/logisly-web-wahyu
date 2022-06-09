import React, { ReactNode } from "react";
import "./index.css";

const Button = ({
  customClass,
  customTitle,
  customName,
  changeLang,
  children,
}: {
  customClass: string;
  customTitle: string;
  customName: string;
  changeLang: (Name: any) => void;
  children: ReactNode;
}) => {
  const handleChangeLang = () => {
    changeLang({ Name: customName });
  };
  return (
    <button
      name={customName}
      onClick={handleChangeLang}
      title={customTitle}
      className={customClass}
    >
      {children}
    </button>
  );
};

export default Button;
