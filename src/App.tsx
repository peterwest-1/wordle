import { useEffect, useState } from "react";
import "./App.css";
import { NUMBER_GUESSES, WORD_LENGTH } from "./constants";
import { Line } from "./Line";
import { randomKey } from "./utilities/randomKey";

import WORDS from "./data/words.json";
import DICTIONARY from "./data/dictionary.json";
import { Bar } from "./Bar";

const App = () => {
  const [guesses, setGuesses] = useState(Array(NUMBER_GUESSES).fill(null));
  const [solution, setSolution] = useState("");
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameCompleted, setIsGameCompleted] = useState(false);

  useEffect(() => {
    /*
    const fetchWord = async () => {
      const response = await fetch(API_URL, { headers: { "Access-Control-Allow-Origin": "*" } });
      console.log(response);
      const wordsList = await response.json();
      const word = wordsList[Math.floor(Math.random() * wordsList.length)];
      setSolution(word);
    };
    */

    const fetchWord = () => {
      const word = WORDS[Math.floor(Math.random() * WORDS.length)];
      setSolution(word);
    };
    fetchWord();
  }, []);

  const handleBackspace = (key: string, currentGuessLength: number) => {
    if ((key === "Backspace" || key === "Delete") && currentGuessLength > 0) {
      setCurrentGuess((guess) => guess.slice(0, -1));
      return;
    }
  };

  const handleEnter = (key: string, currentGuessLength: number) => {
    if (key === "Enter") {
      if (currentGuessLength !== WORD_LENGTH) {
        return;
      }

      const uppercaseGuess = currentGuess.toUpperCase();

      if (!DICTIONARY.includes(uppercaseGuess)) {
        return;
      }

      const newGuesses = [...guesses];
      newGuesses[guesses.findIndex((value) => value === null)] = uppercaseGuess;

      setGuesses([...newGuesses]);
      setCurrentGuess("");

      if (solution === uppercaseGuess) {
        setIsGameCompleted(true);
        return;
      }
    }
  };

  useEffect(() => {
    if (guesses.findIndex((value) => value === null) === -1) {
      setIsGameCompleted(true);
    }
  }, [guesses, isGameCompleted]);

  useEffect(() => {
    const handleKeyPress = (e: any) => {
      if (isGameCompleted) {
        return;
      }

      handleBackspace(e.key, currentGuess.length);
      handleEnter(e.key, currentGuess.length);

      if (currentGuess.length >= WORD_LENGTH) {
        return;
      }

      if (e.key.match(/^[a-zA-Z]{1}$/)) setCurrentGuess(currentGuess + e.key);
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentGuess, guesses, solution, isGameCompleted]);

  return (
    <div className="App">
      <Bar />
      <div className={isGameCompleted ? "solution" : "hidden"}>{isGameCompleted ? solution : null}</div>

      <div className="board">
        {guesses.map((guess: string, i: number) => {
          const isCurrentGuess = i === guesses.findIndex((val) => val === null);

          return (
            <Line
              key={randomKey()}
              guess={isCurrentGuess ? currentGuess : guess ?? ""}
              solution={solution}
              isCurrentGuess={isCurrentGuess}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;
