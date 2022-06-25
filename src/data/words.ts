import WORDS from "../data/words.json";
import DICTIONARY from "../data/dictionary.json";
import { Dictionary, KEY_STATE } from "./types";
import { WORD_LENGTH } from "./constants";

export const getWord = (): string => {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
};

export const isWordInDictionary = (word: string): boolean => {
  const upperword = word.toUpperCase();
  return DICTIONARY.includes(upperword);
};

export const getKeyClasses = (guesses: string[], solution: string): Dictionary<string> => {
  let dic: Dictionary<string> = {};
  guesses.forEach((guess) => {
    if (guess !== null && guess !== "") {
      for (let index: number = 0; index < WORD_LENGTH; index++) {
        let classString = "key";
        const currentLetter = guess[index];
        if (currentLetter === solution[index]) {
          classString += KEY_STATE.CORRECT;
        } else if (solution.includes(currentLetter)) {
          if (dic[currentLetter] !== undefined && dic[currentLetter].includes(KEY_STATE.CORRECT)) return;
          classString += KEY_STATE.CONTAINED;
        } else {
          classString += KEY_STATE.INCORRECT;
        }
        dic[currentLetter] = classString;
      }
    }
  });
  return dic;
};

export const getClassesForKey = (key: string, guesses: string[], solution: string): string => {
  const classes = getKeyClasses(guesses, solution);
  return classes[key] === undefined ? "key" : classes[key];
};
