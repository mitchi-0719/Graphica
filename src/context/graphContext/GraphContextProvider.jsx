import { useState } from "react";
import { GraphContext } from "./GraphContext";
import { useStateMap } from "../../hooks";
import { isNotNullOrUndefined } from "../../hooks/nullOrUndefined";
import { r } from "../../constants/nodeConst";

export const GraphContextProvider = ({ children }) => {
  const [nodes, setNodes, nodesMap] = useStateMap([]);
  const [edges, setEdges] = useState([]);
  const [id, setId] = useState(0);

  const addNode = (x, y) => {
    const newX = isNotNullOrUndefined(x) ? x : Math.random() * (470 - r) + r;
    const newY = isNotNullOrUndefined(y) ? y : Math.random() * (470 - r) + r;
    setNodes((prevNodes) => [...prevNodes, { id: id, x: newX, y: newY }]);
    setId((prevId) => prevId + 1);
  };

  const deleteNode = (id) => {
    setNodes((prevNodes) =>
      prevNodes.filter((node, i) =>
        isNotNullOrUndefined(id) ? node.id !== id : i !== prevNodes.length - 1
      )
    );
    setEdges((prevEdges) =>
      prevEdges.filter((edge) => edge.source !== id && edge.target !== id)
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
          (edge) => edge.source !== source && edge.target !== target
        )
      );
    }
  };

  const contextValue = {
    nodes,
    edges,
    setNodes,
    setEdges,
    addNode,
    deleteNode,
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
