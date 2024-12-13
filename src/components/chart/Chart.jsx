import { useContext, useRef, useState, useEffect } from "react";
import { Edge } from "./Edge";
import { Node } from "./Node/Node";
import { Box } from "@mui/material";
import { useMultipleKeys, useSvgSize } from "../../hooks";
import { GraphContext } from "../../context/graphContext/GraphContext";
import { isNotNullOrUndefined } from "../../hooks/nullOrUndefined";
import { NodeMenu } from "./Node/NodeMenu";

export const Chart = () => {
  const {
    nodes,
    edges,
    addNode,
    updateNode,
    deleteNode,
    selectNodeId,
    setSelectNodeId,
    selectEdgeId,
    setSelectEdgeId,
    nodesMap,
  } = useContext(GraphContext);

  const svgRef = useRef(null);
  const { width: svgWidth, height: svgHeight } = useSvgSize(svgRef);

  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [sideMenuPosition, setSideMenuPosition] = useState({ x: 0, y: 0 });

  const moveNode = (id, x, y, r) => {
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

  const handleEdgeSelect = (id) => {
    if (selectEdgeId === id) {
      setSelectEdgeId(null);
      return;
    }
    setSelectEdgeId(id);
  };

  const isSvgActive = () => {
    return (
      svgRef.current &&
      (svgRef.current === document.activeElement ||
        svgRef.current.contains(document.activeElement))
    );
  };

  const handleDelete = () => {
    if (isNotNullOrUndefined(selectNodeId) && isSvgActive()) {
      deleteNode(selectNodeId);
      setSelectNodeId(null);
      closeSideMenu();
    }
  };

  useMultipleKeys(["Delete", "Backspace"], handleDelete);

  const handleDoubleClick = (e) => {
    const { clientX, clientY } = e;
    const svgRect = svgRef.current.getBoundingClientRect();
    const svgX = clientX - svgRect.left;
    const svgY = clientY - svgRect.top;

    addNode({ x: svgX, y: svgY });
  };

  const handleRightClick = (e, id) => {
    e.preventDefault();
    const { clientX, clientY } = e;
    setSideMenuPosition({ x: clientX, y: clientY });
    setSidebarVisible(true);
    setSelectNodeId(id);
  };

  useEffect(() => {
    const handleActionOutside = () => {
      if (sidebarVisible) {
        setSidebarVisible(false);
      }
    };
    document.addEventListener("click", handleActionOutside);
    document.addEventListener("mousedown", handleActionOutside);
    document.addEventListener("keydown", handleActionOutside);

    return () => {
      document.removeEventListener("click", handleActionOutside);
      document.removeEventListener("mousedown", handleActionOutside);
      document.removeEventListener("keydown", handleActionOutside);
    };
  }, [sidebarVisible]);

  const closeSideMenu = () => {
    setSidebarVisible(false);
  };

  return (
    <Box width="100%" height="100%">
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        tabIndex={0}
        onDoubleClick={handleDoubleClick}
        style={{ clickEvent: "none", outline: "none" }}
      >
        {edges.map((edge, i) => (
          <Edge
            key={i}
            edge={edge}
            nodes={nodes}
            nodesMap={nodesMap}
            onSelect={handleEdgeSelect}
            isSelected={selectEdgeId === edge.id}
          />
        ))}
        {nodes.map((node, i) => (
          <Node
            node={node}
            key={i}
            moveNode={moveNode}
            onSelect={handleNodeSelect}
            isSelected={selectNodeId === node.id}
            handleRightClick={handleRightClick}
          />
        ))}
      </svg>

      <NodeMenu
        isOpen={sidebarVisible}
        sideMenuPosition={sideMenuPosition}
        handleSideMenuClose={closeSideMenu}
      />
    </Box>
  );
};
