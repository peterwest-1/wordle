import { render } from "@testing-library/react";
import { Line } from "./Line";

test("Render Line component", () => {
  const guess = "a";
  const solution = "b";
  const isCurrentGuess = true;

  render(<Line guess={guess} solution={solution} isCurrentGuess={isCurrentGuess} />);
});
