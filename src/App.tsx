import { useCallback, useEffect, useState } from "react";
import { NUMBER_GUESSES, WORD_LENGTH } from "./data/constants";
import { Line } from "./Line";
import { Bar } from "./Bar";
import { Keyboard } from "./Keyboard";
import "./App.css";
import { getWord, isWordInDictionary } from "./data/words";

const App = () => {
  const [isGameCompleted, setIsGameCompleted] = useState(false);
  const [solution] = useState(getWord());
  const [guesses, setGuesses] = useState(Array(NUMBER_GUESSES).fill(null));
  const [currentGuess, setCurrentGuess] = useState("");

  const handleBackspace = useCallback(
    (key: string) => {
      if ((key === "Backspace" || key === "Delete") && currentGuess.length > 0) {
        setCurrentGuess((guess) => guess.slice(0, -1));
        return;
      }
    },
    [currentGuess.length]
  );

  const handleSubmit = useCallback(
    (key: string) => {
      if (key === "Enter") {
        if (currentGuess.length !== WORD_LENGTH) return;

        //TODO: - Add visual feedback for word not in dictionary
        if (!isWordInDictionary(currentGuess)) return;

        const uppercaseGuess = currentGuess.toUpperCase();
        const newGuesses = [...guesses];
        newGuesses[guesses.findIndex((value) => value === null)] = uppercaseGuess;

        setGuesses([...newGuesses]);
        setCurrentGuess("");

        if (solution === uppercaseGuess) setIsGameCompleted(true);
      }
    },
    [currentGuess, guesses, solution]
  );

  const handleGame = useCallback(
    (key: string) => {
      if (isGameCompleted) return;
      handleBackspace(key);
      handleSubmit(key);
      if (currentGuess.length >= WORD_LENGTH) return;
      if (key.match(/^[a-zA-Z]{1}$/)) setCurrentGuess(currentGuess + key);
    },
    [currentGuess, handleBackspace, handleSubmit, isGameCompleted]
  );
  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      handleGame(e.key);
    },
    [handleGame]
  );

  useEffect(() => {
    if (guesses.findIndex((value) => value === null) === -1) setIsGameCompleted(true);
  }, [guesses, isGameCompleted]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className="App">
      <Bar />
      <div className={isGameCompleted ? "solution" : "hidden"}>{isGameCompleted ? solution : null}</div>
      <div className="board">
        {guesses.map((guess: string, index: number) => {
          const isCurrentGuess = index === guesses.findIndex((val) => val === null);
          return (
            <Line
              key={index}
              guess={isCurrentGuess ? currentGuess : guess ?? ""}
              solution={solution}
              isCurrentGuess={isCurrentGuess}
            />
          );
        })}
      </div>
      <Keyboard guesses={guesses} solution={solution} onKeyPressed={handleGame} />
    </div>
  );
};

export default App;
