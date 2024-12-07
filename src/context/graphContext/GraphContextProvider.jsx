import { useState } from "react";
import { GraphContext } from "./GraphContext";
import { useStateMap } from "../../hooks";
import { isNotNullOrUndefined } from "../../hooks/nullOrUndefined";
import { r } from "../../constants/nodeConst";

export const GraphContextProvider = ({ children }) => {
  const [nodes, setNodes, nodesMap] = useStateMap([]);
  const [edges, setEdges] = useState([]);
  const [id, setId] = useState(0);
  const [selectNodeId, setSelectNodeId] = useState(null);

  const addNode = (x, y, color, label) => {
    const newX = isNotNullOrUndefined(x) ? x : Math.random() * (470 - r) + r;
    const newY = isNotNullOrUndefined(y) ? y : Math.random() * (470 - r) + r;
    setNodes((prevNodes) => [
      ...prevNodes,
      {
        id: id,
        x: newX,
        y: newY,
        color: color ?? "black",
        label: label ?? `${id}`,
      },
    ]);
    setId((prevId) => prevId + 1);
  };

  const updateNode = (id, { x, y, color, label }) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === id
          ? {
              ...node,
              x: isNotNullOrUndefined(x) ? x : node.x,
              y: isNotNullOrUndefined(y) ? y : node.y,
              color: isNotNullOrUndefined(color) ? color : node.color,
              label: isNotNullOrUndefined(label) ? label : node.label,
            }
          : node,
      ),
    );
  };

  const deleteNode = (id) => {
    setNodes((prevNodes) =>
      prevNodes.filter((node, i) =>
        isNotNullOrUndefined(id) ? node.id !== id : i !== prevNodes.length - 1,
      ),
    );
    setEdges((prevEdges) =>
      prevEdges.filter((edge) => edge.source !== id && edge.target !== id),
    );
  };

  const addEdge = (source, target) => {
    if (isNotNullOrUndefined(source) && isNotNullOrUndefined(target)) {
      setEdges((prevEdges) => [...prevEdges, { source, target }]);
    }
  };

  const deleteEdge = (source, target) => {
    if (isNotNullOrUndefined(source) && isNotNullOrUndefined(target)) {
      setEdges((prevEdges) =>
        prevEdges.filter(
          (edge) => edge.source !== source && edge.target !== target,
        ),
      );
    }
  };

  const contextValue = {
    nodes,
    edges,
    setNodes,
    setEdges,
    addNode,
    updateNode,
    deleteNode,
    selectNodeId,
    setSelectNodeId,
    addEdge,
    deleteEdge,
    nodesMap,
  };

  return (
    <GraphContext.Provider value={contextValue}>
      {children}
    </GraphContext.Provider>
  );
};
