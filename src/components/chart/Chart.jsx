import { useEffect, useState } from "react";
import { ZoomableSVG } from "../../common/ZoomableSVG";
import { calcCoordinate } from "./calcCoordinate";
import { Link } from "./Link";
import { Node } from "./Node";
import { Box } from "@mui/material";

export const Chart = ({ nodes, links }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [calcNodes, setCalcNodes] = useState([]);
  const [calcLinks, setCalcLinks] = useState([]);

  useEffect(() => {
    const { _nodes, _links } = calcCoordinate(nodes, links);
    setCalcNodes(_nodes);
    setCalcLinks(_links);
    setIsLoading(false);
  }, [nodes, links]);

  const updateNodePosition = (id, x, y) => {
    setCalcNodes((prevNodes) =>
      prevNodes.map((node) => (node.id === id ? { ...node, x, y } : node))
    );
  };

  return (
    <Box width="100%">
      {!isLoading ? (
        <ZoomableSVG width="100%" height="100%">
          {calcLinks.length !== 0 &&
            calcLinks.map((link, i) => <Link link={link} key={i} />)}
          {calcNodes.length !== 0 &&
            calcNodes.map((node, i) => (
              <Node
                node={node}
                key={i}
                updateNodePosition={updateNodePosition}
              />
            ))}
        </ZoomableSVG>
      ) : (
        <Box>Loading...</Box>
      )}
    </Box>
  );
};
