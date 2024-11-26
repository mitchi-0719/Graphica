export const calcCoordinate = (nodes, links) => {
  const calcNodes = nodes.map((node) => ({
    id: node.id,
    x: Math.random() * 300,
    y: Math.random() * 300,
  }));
  const calcLinks = links.map((link) => {
    const source = {
      source: link.source,
      x: calcNodes.find((node) => node.id === link.source).x,
      y: calcNodes.find((node) => node.id === link.source).y,
    };
    const target = {
      target: link.target,
      x: calcNodes.find((node) => node.id === link.target).x,
      y: calcNodes.find((node) => node.id === link.target).y,
    };
    return { source, target };
  });

  return { _nodes: calcNodes, _links: calcLinks };
};
