import "./Tile.css";

interface TileProps {
  letter: string;
  className: string;
}

export const Tile: React.FC<TileProps> = ({ letter, className }) => {
  return <div className={className}>{letter}</div>;
};
