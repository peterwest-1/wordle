import React from "react";
import "./Bar.css";
interface BarProps {}

export const Bar: React.FC<BarProps> = ({}) => {
  return (
    <div className="top">
      <div className="buttonContainer">
        <button>M</button>
        <button>?</button>
      </div>
      <div
        className="
      title"
      >
        Wordle Clone
      </div>
      <div className="buttonContainer">
        <button>S</button>
        <button>S</button>
      </div>
    </div>
  );
};
