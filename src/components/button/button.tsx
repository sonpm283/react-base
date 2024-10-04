import React from "react";
import { Link } from "react-router-dom";

interface IButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  to?: string;
  type?: "button" | "submit" | "reset";
  className?: string;
}

const Button: React.FC<IButtonProps> = ({
  children,
  onClick,
  to,
  type = "button",
  className,
}) => {
  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} type={type} className={className}>
      {children}
    </button>
  );
};

export default Button;
