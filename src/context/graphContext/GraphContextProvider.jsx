import { useState } from "react";
import { GraphContext } from "./GraphContext";
import { useStateMap } from "../../hooks";
import { isNotNullOrUndefined } from "../../hooks/nullOrUndefined";

export const GraphContextProvider = ({ children }) => {
  const [nodes, setNodes, nodesMap] = useStateMap([]);
  const [edges, setEdges] = useState([]);

  const [nodeId, setNodeId] = useState(0);
  const [edgeId, setEdgeId] = useState(0);

  const [selectNodeId, setSelectNodeId] = useState(null);
  const [selectEdgeId, setSelectEdgeId] = useState(null);

  const [isDrawEdgeMode, setIsDrawEdgeMode] = useState(false);
  const defaultR = 30;

  const addNode = ({ id, x, y, r, color, label }) => {
    const newId = isNotNullOrUndefined(id) ? id : nodeId;
    const newX = isNotNullOrUndefined(x)
      ? x
      : Math.random() * (470 - defaultR) + defaultR;
    const newY = isNotNullOrUndefined(y)
      ? y
      : Math.random() * (470 - defaultR) + defaultR;
    const newR = isNotNullOrUndefined(r) ? r : defaultR;
    setNodes((prevNodes) => [
      ...prevNodes,
      {
        id: newId,
        x: newX,
        y: newY,
        r: newR,
        color: color ?? "black",
        label: label ?? `${nodeId}`,
      },
    ]);
    const prevNodeId = nodeId;
    setNodeId((prevId) => prevId + 1);
    return prevNodeId;
  };

  const updateNode = (id, { x, y, r, color, label }) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === id
          ? {
              ...node,
              x: isNotNullOrUndefined(x) ? x : node.x,
              y: isNotNullOrUndefined(y) ? y : node.y,
              r: isNotNullOrUndefined(r) ? r : node.r,
              color: isNotNullOrUndefined(color) ? color : node.color,
              label: isNotNullOrUndefined(label) ? label : node.label,
            }
          : node,
      ),
    );
  };

  const deleteNode = (id) => {
    const deleteNodeId = isNotNullOrUndefined(id)
      ? id
      : nodes[nodes.length - 1].id;
    setNodes((prevNodes) =>
      prevNodes.filter((node) => node.id !== deleteNodeId),
    );
    setEdges((prevEdges) =>
      prevEdges.filter(
        (edge) => edge.source !== deleteNodeId && edge.target !== deleteNodeId,
      ),
    );

    if (selectNodeId === deleteNodeId) {
      setSelectNodeId(null);
    }
  };

  const clearNode = () => {
    setNodes([]);
    setNodeId(0);
    setSelectNodeId(null);
  };

  const addEdge = ({ source, target, label, weight, color }) => {
    if (isNotNullOrUndefined(source) && isNotNullOrUndefined(target)) {
      setEdges((prevEdges) => [
        ...prevEdges,
        {
          id: edgeId,
          source,
          target,
          label: isNotNullOrUndefined(label) ? label : "",
          weight: isNotNullOrUndefined(weight) ? weight : 1,
          color: isNotNullOrUndefined(color) ? color : "black",
        },
      ]);
      setEdgeId((prevId) => prevId + 1);
    }
  };

  const updateEdge = (id, { source, target, label, weight, color }) => {
    setEdges((prevEdges) =>
      prevEdges.map((edge) =>
        edge.id === id
          ? {
              ...edge,
              source: isNotNullOrUndefined(source) ? source : edge.source,
              target: isNotNullOrUndefined(target) ? target : edge.target,
              label: isNotNullOrUndefined(label) ? label : edge.label,
              weight: isNotNullOrUndefined(weight) ? weight : edge.weight,
              color: isNotNullOrUndefined(color) ? color : edge.color,
            }
          : edge,
      ),
    );
  };

  const deleteEdge = (id) => {
    if (isNotNullOrUndefined(id)) {
      setEdges((prevEdges) => prevEdges.filter((edge) => edge.id !== id));
    }
  };

  const clearEdge = () => {
    setEdges([]);
    setEdgeId(0);
    setSelectEdgeId(null);
  };

  const contextValue = {
    // ノード関連
    nodeId,
    setNodeId,
    nodes,
    setNodes,
    addNode,
    updateNode,
    deleteNode,
    selectNodeId,
    setSelectNodeId,
    clearNode,
    // エッジ関連
    edges,
    setEdges,
    addEdge,
    updateEdge,
    deleteEdge,
    selectEdgeId,
    setSelectEdgeId,
    clearEdge,
    // その他
    nodesMap,
    isDrawEdgeMode,
    setIsDrawEdgeMode,
  };

  return (
    <GraphContext.Provider value={contextValue}>
      {children}
    </GraphContext.Provider>
  );
};
