export const Edge = ({ edge, nodes, nodesMap }) => {
  return (
    <line
      x1={nodes[nodesMap[edge.source]].x}
      y1={nodes[nodesMap[edge.source]].y}
      x2={nodes[nodesMap[edge.target]].x}
      y2={nodes[nodesMap[edge.target]].y}
      style={{ stroke: "black", strokeWidth: "2" }}
    />
  );
};
