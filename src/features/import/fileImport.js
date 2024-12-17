export const fileImport = (data, nodeId, setNodeId, addNode, addEdge) => {
  const idMap = {};
  const nodesLength = data.nodes.length;
  data.nodes.forEach((node, i) => {
    const { id, x, y, r, label, color } = node;
    const newNode = { id: nodeId + i, x, y, r, label, color };
    addNode(newNode);
    idMap[id] = nodeId + i;
  });

  setNodeId((prevId) => prevId + nodesLength);

  data.edges.forEach((edge) => {
    const { source, target, weight, label, color } = edge;
    addEdge({
      source: idMap[source],
      target: idMap[target],
      weight,
      label,
      color,
    });
  });
};
