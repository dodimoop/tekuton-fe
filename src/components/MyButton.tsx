import { Button, ButtonProps } from "@mui/material";
import React from "react";

interface MyButtonProps extends Omit<ButtonProps, "variant" | "color"> {
  onClick: (e: any | null) => void;
  children?: React.ReactNode;
  variant?: ButtonProps["variant"];
  color?: ButtonProps["color"];
}

const MyButton: React.FC<MyButtonProps> = ({
  onClick,
  children,
  variant = "contained",
  color = "primary",
  ...props
}) => {
  return (
    <Button
      disableRipple
      fullWidth
      variant={variant}
      color={color}
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  );
};

export default MyButton;
