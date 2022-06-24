import React from "react";
import { getClassesForKey } from "./data/words";
import { Key } from "./Key";
import "./Keyboard.css";

interface KeyboardProps {
  guesses: string[];
  onKeyPressed: any;
  solution: string;
}

export const Keyboard: React.FC<KeyboardProps> = ({ guesses, onKeyPressed, solution }) => {
  const top = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const middle = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const bottom = ["Z", "X", "C", "V", "B", "N", "M"];

  const handleKeyClick = (keyValue: string) => {
    onKeyPressed(keyValue);
  };

  return (
    <div className="keyboard">
      <div className="row">
        {top.map((key: string, index: number) => (
          <Key
            classes={getClassesForKey(key, guesses, solution)}
            key={index}
            keyValue={key}
            onClick={() => handleKeyClick(key)}
          />
        ))}
      </div>
      <div className="row">
        <div className="spacer"></div>
        {middle.map((key: string, index: number) => (
          <Key
            classes={getClassesForKey(key, guesses, solution)}
            key={index}
            keyValue={key}
            onClick={() => handleKeyClick(key)}
          />
        ))}
        <div className="spacer"></div>
      </div>
      <div className="row">
        <button className="key larger" onClick={() => handleKeyClick("Enter")}>
          ENTER
        </button>
        {bottom.map((key: string, index: number) => (
          <Key
            classes={getClassesForKey(key, guesses, solution)}
            key={index}
            keyValue={key}
            onClick={() => handleKeyClick(key)}
          />
        ))}
        <button className="key larger" onClick={() => handleKeyClick("Backspace")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            className="game-icon"
            data-testid="icon-backspace"
          >
            <path
              fill="white"
              d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};
