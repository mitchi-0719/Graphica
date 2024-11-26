export const Link = ({ link }) => {
  return (
    <line
      className="link"
      x1={link.source.x}
      y1={link.source.y}
      x2={link.target.x}
      y2={link.target.y}
      style={{ stroke: "black", strokeWidth: "0.5" }}
    />
  );
};
