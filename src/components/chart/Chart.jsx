import { useContext, useRef, useState } from "react";
import { Edge } from "./Edge";
import { Node } from "./Node";
import { Box } from "@mui/material";
import { useMultipleKeys, useSvgSize } from "../../hooks";
import { GraphContext } from "../../context/graphContext/GraphContext";
import { isNotNullOrUndefined } from "../../hooks/nullOrUndefined";
import { r } from "../../constants/nodeConst";

export const Chart = () => {
  const { nodes, edges, setNodes, deleteNode, nodesMap } =
    useContext(GraphContext);
  const [selectedNode, setSelectedNode] = useState(null);
  const svgRef = useRef(null);

  const { width: svgWidth, height: svgHeight } = useSvgSize(svgRef);

  const updateNodePosition = (id, x, y) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) => {
        if (node.id === id) {
          const newX = Math.min(Math.max(x, r), svgWidth - r);
          const newY = Math.min(Math.max(y, r), svgHeight - r);
          return { ...node, x: newX, y: newY };
        } else {
          return node;
        }
      })
    );
  };

  const handleNodeSelect = (id) => {
    if (selectedNode === id) {
      setSelectedNode(null);
      return;
    }
    setSelectedNode(id);
  };

  const handleDelete = () => {
    if (isNotNullOrUndefined(selectedNode)) {
      deleteNode(selectedNode);
      setSelectedNode(null);
    }
  };
  useMultipleKeys(["Delete", "Backspace"], handleDelete);
  return (
    <Box width="100%" height="100%">
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        style={{ clickEvent: "none" }}
      >
        {edges.map((edge, i) => (
          <Edge edge={edge} nodes={nodes} nodesMap={nodesMap} key={i} />
        ))}
        {nodes.map((node, i) => (
          <Node
            node={node}
            key={i}
            updateNodePosition={updateNodePosition}
            onSelect={handleNodeSelect}
            isSelected={selectedNode === node.id}
          />
        ))}
      </svg>
    </Box>
  );
};
