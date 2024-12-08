import { useState } from "react";
import { GraphContext } from "./GraphContext";
import { useStateMap } from "../../hooks";
import { isNotNullOrUndefined } from "../../hooks/nullOrUndefined";
import { r } from "../../constants/nodeConst";

export const GraphContextProvider = ({ children }) => {
  const [nodes, setNodes, nodesMap] = useStateMap([]);
  const [edges, setEdges] = useState([]);

  const [nodeId, setNodeIdId] = useState(0);
  const [edgeId, setEdgeId] = useState(0);

  const [selectNodeId, setSelectNodeId] = useState(null);
  const [selectEdgeId, setSelectEdgeId] = useState(null);

  const addNode = ({ x, y, color, label }) => {
    const newX = isNotNullOrUndefined(x) ? x : Math.random() * (470 - r) + r;
    const newY = isNotNullOrUndefined(y) ? y : Math.random() * (470 - r) + r;
    setNodes((prevNodes) => [
      ...prevNodes,
      {
        id: nodeId,
        x: newX,
        y: newY,
        color: color ?? "black",
        label: label ?? `${nodeId}`,
      },
    ]);
    setNodeIdId((prevId) => prevId + 1);
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

  const contextValue = {
    // ノード関連
    nodes,
    setNodes,
    addNode,
    updateNode,
    deleteNode,
    selectNodeId,
    setSelectNodeId,
    // エッジ関連
    edges,
    setEdges,
    addEdge,
    updateEdge,
    deleteEdge,
    selectEdgeId,
    setSelectEdgeId,
    // その他
    nodesMap,
  };

  return (
    <GraphContext.Provider value={contextValue}>
      {children}
    </GraphContext.Provider>
  );
};
