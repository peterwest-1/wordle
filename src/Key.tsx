import React from "react";
import "./Key.css";

interface KeyProps {
  keyValue: string;
  onClick: any;
  classes: string;
}

export const Key: React.FC<KeyProps> = ({ keyValue, onClick, classes }) => {
  return (
    <button className={classes} onClick={onClick}>
      {keyValue}
    </button>
  );
};
