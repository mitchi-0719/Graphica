import { useContext, useRef } from "react";
import { Edge } from "./Edge";
import { Node } from "./Node";
import { Box } from "@mui/material";
import { useMultipleKeys, useSvgSize } from "../../hooks";
import { GraphContext } from "../../context/graphContext/GraphContext";
import { isNotNullOrUndefined } from "../../hooks/nullOrUndefined";
import { r } from "../../constants/nodeConst";

export const Chart = () => {
  const {
    nodes,
    edges,
    addNode,
    updateNode,
    deleteNode,
    selectNodeId,
    setSelectNodeId,
    nodesMap,
  } = useContext(GraphContext);
  const svgRef = useRef(null);

  const { width: svgWidth, height: svgHeight } = useSvgSize(svgRef);

  const moveNode = (id, x, y) => {
    const newX = Math.min(Math.max(x, r), svgWidth - r);
    const newY = Math.min(Math.max(y, r), svgHeight - r);
    updateNode(id, { x: newX, y: newY });
  };

  const handleNodeSelect = (id) => {
    if (selectNodeId === id) {
      setSelectNodeId(null);
      return;
    }
    setSelectNodeId(id);
  };

  const handleDelete = () => {
    if (isNotNullOrUndefined(selectNodeId)) {
      deleteNode(selectNodeId);
      setSelectNodeId(null);
    }
  };
  useMultipleKeys(["Delete", "Backspace"], handleDelete);

  const handleDoubleClick = (e) => {
    const { clientX, clientY } = e;
    const svgRect = svgRef.current.getBoundingClientRect();
    const svgX = clientX - svgRect.left;
    const svgY = clientY - svgRect.top;

    addNode(svgX, svgY);
  };

  return (
    <Box width="100%" height="100%">
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        onDoubleClick={handleDoubleClick}
        style={{ clickEvent: "none" }}
      >
        {edges.map((edge, i) => (
          <Edge edge={edge} nodes={nodes} nodesMap={nodesMap} key={i} />
        ))}
        {nodes.map((node, i) => (
          <Node
            node={node}
            key={i}
            moveNode={moveNode}
            onSelect={handleNodeSelect}
            isSelected={selectNodeId === node.id}
          />
        ))}
      </svg>
    </Box>
  );
};
