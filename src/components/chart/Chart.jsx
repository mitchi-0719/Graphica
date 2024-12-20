import { useContext, useRef, useState, useEffect } from "react";
import { Edge } from "./Edge";
import { Node } from "./Node/Node";
import { Box } from "@mui/material";
import { useMultipleKeys, useSvgSize } from "../../hooks";
import { GraphContext } from "../../context/graphContext/GraphContext";
import { isNotNullOrUndefined } from "../../hooks/nullOrUndefined";
import { NodeMenu } from "./Node/NodeMenu";

export const downloadSvgAsImage = (svgRef, format = "png") => {
  if (!svgRef.current) return;

  const svgData = new XMLSerializer().serializeToString(svgRef.current);
  const svgBlob = new Blob([svgData], {
    type: "image/svg+xml;charset=utf-8",
  });
  const svgUrl = URL.createObjectURL(svgBlob);

  const canvas = document.createElement("canvas");
  canvas.width = svgRef.current.clientWidth;
  canvas.height = svgRef.current.clientHeight;

  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.onload = () => {
    ctx?.drawImage(img, 0, 0);
    URL.revokeObjectURL(svgUrl);

    const imageUrl = canvas.toDataURL(`image/${format}`);
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `graph.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  img.src = svgUrl;
};

export const Chart = () => {
  const {
    nodes,
    edges,
    addNode,
    updateNode,
    deleteNode,
    selectNodeId,
    setSelectNodeId,
    addEdge,
    selectEdgeId,
    setSelectEdgeId,
    nodesMap,
    isDrawEdgeMode,
  } = useContext(GraphContext);

  const svgRef = useRef(null);
  const nodeMenuRef = useRef(null); // NodeMenu用のref
  const { width: svgWidth, height: svgHeight } = useSvgSize(svgRef);

  const [sideMenuVisible, setSideMenuVisible] = useState(false);
  const [sideMenuPosition, setSideMenuPosition] = useState({ x: 0, y: 0 });

  const moveNode = (id, x, y, r) => {
    const newX = Math.min(Math.max(x, r), svgWidth - r);
    const newY = Math.min(Math.max(y, r), svgHeight - r);
    updateNode(id, { x: newX, y: newY });
  };

  const handleNodeClick = (id) => {
    if (selectNodeId === id) {
      setSelectNodeId(null);
      return;
    }
    if (isDrawEdgeMode) {
      if (isNotNullOrUndefined(selectNodeId)) {
        addEdge({ source: selectNodeId, target: id });
      } else {
        setSelectNodeId(id);
      }
    } else {
      setSelectNodeId(id);
    }
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

  const onDelete = () => {
    deleteNode(selectNodeId);
    setSelectNodeId(null);
    closeSideMenu();
  };

  const handleDelete = () => {
    console.log(1);
    if (isNotNullOrUndefined(selectNodeId) && isSvgActive()) {
      onDelete();
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
    setSideMenuVisible(true);
    setSelectNodeId(id);
  };

  useEffect(() => {
    const handleActionOutside = (e) => {
      if (
        sideMenuVisible &&
        nodeMenuRef.current &&
        !nodeMenuRef.current.contains(e.target)
      ) {
        setSideMenuVisible(false);
      }
    };
    document.addEventListener("mousedown", handleActionOutside);

    return () => {
      document.removeEventListener("mousedown", handleActionOutside);
    };
  }, [sideMenuVisible]);

  const closeSideMenu = () => {
    setSideMenuVisible(false);
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
            onSelect={handleNodeClick}
            isSelected={selectNodeId === node.id}
            handleRightClick={handleRightClick}
          />
        ))}
      </svg>

      <NodeMenu
        nodeMenuRef={nodeMenuRef}
        isOpen={sideMenuVisible}
        sideMenuPosition={sideMenuPosition}
        handleSideMenuClose={closeSideMenu}
        onDelete={onDelete}
      />
    </Box>
  );
};
