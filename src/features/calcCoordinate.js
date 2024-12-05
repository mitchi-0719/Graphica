import { r } from "../constants/nodeConst";

export const calcCoordinate = (nodes, edges) => {
  const calcNodes = nodes.map((node) => ({
    id: node.id,
    x: Math.random() * (470 - r) + r,
    y: Math.random() * (470 - r) + r,
  }));
  return { nodes: calcNodes, edges };
};
