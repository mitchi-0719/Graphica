import { Box, Button } from "@mui/material";
import { useIsSmallDevice } from "../../hooks/Responsive";
import { ToggleButton } from "./ToggleButton";
import { GraphContext } from "../../context/graphContext/GraphContext";
import { useContext } from "react";

export const Setting = () => {
  const { nodes, addNode, deleteNode, addEdge, deleteEdge } =
    useContext(GraphContext);
  const isSmallDevice = useIsSmallDevice();

  const handlePlusClick = () => {
    addNode();
  };

  const handleMinusClick = () => {
    deleteNode();
  };

  return (
    <Box
      width={isSmallDevice ? "100%" : "200px"}
      border="1px solid black"
      boxShadow={3}
      padding={2}
      bgcolor="white"
    >
      <Box>
        <ToggleButton
          onPlusChange={handlePlusClick}
          onMinusChange={handleMinusClick}
          value={nodes.length}
        />
      </Box>

      {/* 仮置き */}
      <Button onClick={() => addEdge(1, 2)}>add edge</Button>
      <Button onClick={() => deleteEdge(1, 2)}>delete edge</Button>
    </Box>
  );
};
