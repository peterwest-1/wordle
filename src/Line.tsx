import { WORD_LENGTH } from "./constants";
import "./Line.css";
import { Tile } from "./Tile";
import { randomKey } from "./utilities/randomKey";

interface LineProps {
  guess: string;
  solution: string;
  isCurrentGuess: boolean;
}

export const Line: React.FC<LineProps> = ({ guess, solution, isCurrentGuess }) => {
  const tiles: any[] = [];

  for (let index = 0; index < WORD_LENGTH; index++) {
    let classString = "tile";
    const currentLetter = guess[index];
    if (!isCurrentGuess && guess !== "") {
      if (currentLetter === solution[index]) {
        classString += " correct";
      } else if (solution.includes(currentLetter)) {
        classString += " location";
      } else {
        classString += " incorrect";
      }
    }
    tiles.push(<Tile className={classString} key={randomKey()} letter={currentLetter} />);
  }
  return <div className="line">{tiles.map((tile) => tile)}</div>;
};
