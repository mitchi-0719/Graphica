export const Edge = ({ edge, nodes, nodesMap, onSelect, isSelected }) => {
  return (
    <line
      onClick={() => onSelect(edge.id)}
      x1={nodes[nodesMap[edge.source]].x}
      y1={nodes[nodesMap[edge.source]].y}
      x2={nodes[nodesMap[edge.target]].x}
      y2={nodes[nodesMap[edge.target]].y}
      style={{ stroke: "black", strokeWidth: isSelected ? "4" : "2" }}
    />
  );
};
