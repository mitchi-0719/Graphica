export const calcCoordinate = (nodes, links) => {
  const calcNodes = nodes.map((node) => ({
    id: node.id,
    x: Math.random() * (470 - 30) + 30,
    y: Math.random() * (470 - 30) + 30,
  }));
  return { _nodes: calcNodes, _links: links };
};
