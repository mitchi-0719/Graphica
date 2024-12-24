import { Box, Button } from "@mui/material";
import { useContext } from "react";
import { GraphContext } from "../../context/graphContext/GraphContext";

export const ArrangeBinaryTreeButton = () => {
  const { nodes, updateNode } = useContext(GraphContext);

  const arrangeBinaryTree = () => {
    if (nodes.length === 0) return;
    const sortedNodes = [...nodes].sort((a, b) => b.value - a.value);
    const treeWidth = 800;
    const levelHeight = 100;
    const rootX = treeWidth / 2;
    const marginX = 40;

    const positions = [];
    const calculatePosition = (index, level, x, width) => {
      if (index >= sortedNodes.length) return;

      const node = sortedNodes[index];
      const y = level * levelHeight + 50;
      positions.push({ id: node.id, x, y });

      calculatePosition(2 * index + 1, level + 1, x - width / 2, width / 2);

      calculatePosition(2 * index + 2, level + 1, x + width / 2, width / 2);
    };

    calculatePosition(0, 0, rootX, treeWidth - marginX);

    positions.forEach(({ id, x, y }) => {
      updateNode(id, { x, y });
    });
  };

  return (
    <Box>
      <Box display="flex" justifyContent="center" marginTop={1}>
        <Button
          onClick={arrangeBinaryTree}
          variant="contained"
          size="small"
          disabled={nodes.length === 0}
        >
          完全二分木の配置にする
        </Button>
      </Box>
    </Box>
  );
};
