export const Edge = ({ link, nodes, nodesMap }) => {
  return (
    <line
      className="link"
      x1={nodes[nodesMap[link.source]].x}
      y1={nodes[nodesMap[link.source]].y}
      x2={nodes[nodesMap[link.target]].x}
      y2={nodes[nodesMap[link.target]].y}
      style={{ stroke: "black", strokeWidth: "2" }}
    />
  );
};
