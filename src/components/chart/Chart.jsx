import { useEffect, useRef, useState } from "react";
import { calcCoordinate } from "./calcCoordinate";
import { Edge } from "./Edge";
import { Node } from "./Node";
import { Box } from "@mui/material";
import { useStateMap } from "../../hooks/useStateMap";
import { useSvgSize } from "../../hooks/useSVGSize";
import { useMultipleKeys } from "../../hooks/useMultipleKeys";

export const Chart = ({ nodes, links }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [calcNodes, setCalcNodes, nodesMap] = useStateMap([]);
  const [calcLinks, setCalcLinks] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const svgRef = useRef(null);
  const r = 30;

  const { width: svgWidth, height: svgHeight } = useSvgSize(svgRef);

  useEffect(() => {
    const { _nodes, _links } = calcCoordinate(nodes, links);
    setCalcNodes(_nodes);
    setCalcLinks(_links);
    setIsLoading(false);
  }, [nodes, links, setCalcNodes, setCalcLinks]);

  const updateNodePosition = (id, x, y) => {
    setCalcNodes((prevNodes) =>
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
    if (selectedNode) {
      setCalcNodes((prevNodes) =>
        prevNodes.filter((node) => node.id !== selectedNode)
      );
      setCalcLinks((prevLinks) =>
        prevLinks.filter(
          (link) => link.source !== selectedNode && link.target !== selectedNode
        )
      );
      setSelectedNode(null);
    }
  };
  useMultipleKeys(["Delete", "Backspace"], handleDelete);

  return (
    <Box width="100%">
      {!isLoading ? (
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          style={{ clickEvent: "none" }}
        >
          {calcLinks.map((link, i) => (
            <Edge link={link} nodes={calcNodes} nodesMap={nodesMap} key={i} />
          ))}
          {calcNodes.map((node, i) => (
            <Node
              node={node}
              key={i}
              updateNodePosition={updateNodePosition}
              onSelect={handleNodeSelect}
              isSelected={selectedNode === node.id}
              r={r}
            />
          ))}
        </svg>
      ) : (
        <Box>Loading...</Box>
      )}
    </Box>
  );
};
