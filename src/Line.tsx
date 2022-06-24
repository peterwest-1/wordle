import { WORD_LENGTH } from "./data/constants";
import "./Line.css";
import { Tile } from "./Tile";

interface LineProps {
  guess: string;
  solution: string;
  isCurrentGuess: boolean;
}

export const Line: React.FC<LineProps> = ({ guess, solution, isCurrentGuess }) => {
  const tiles: React.ReactElement[] = [];

  for (let index: number = 0; index < WORD_LENGTH; index++) {
    let classString = "tile";
    const currentLetter = guess[index];
    if (!isCurrentGuess && guess !== "") {
      if (currentLetter === solution[index]) {
        classString += " correct";
      } else if (solution.includes(currentLetter)) {
        classString += " contained";
      } else {
        classString += " incorrect";
      }
    }
    tiles.push(<Tile className={classString} key={index} letter={currentLetter} />);
  }
  return <div className="line">{tiles.map((tile) => tile)}</div>;
};
