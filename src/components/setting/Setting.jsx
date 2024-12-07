import { Box, Typography } from "@mui/material";
import { useIsSmallDevice } from "../../hooks/Responsive";
import { ToggleButton } from "./ToggleButton";
import { GraphContext } from "../../context/graphContext/GraphContext";
import { useContext } from "react";
import { LabelChangeField } from "./LabelChangeField";
import { ColorPalette } from "./ColorPalette";
import { OperateEdgeButton } from "./OperateEdgeButton";

export const Setting = () => {
  const { nodes, addNode, deleteNode } = useContext(GraphContext);
  const isSmallDevice = useIsSmallDevice();

  const handlePlusClick = () => {
    addNode();
  };

  const handleMinusClick = () => {
    deleteNode();
  };

  return (
    // TODO UI死ぬほど適当 後で直す
    <Box
      display="flex"
      flexDirection="column"
      width={isSmallDevice ? "100%" : "400px"}
      border="1px solid black"
      boxShadow={3}
      padding={2}
      bgcolor="white"
      gap={2}
    >
      <Box>
        <Typography variant="h7">ノードの追加削除</Typography>
        <ToggleButton
          onPlusChange={handlePlusClick}
          onMinusChange={handleMinusClick}
          value={nodes.length}
        />
      </Box>
      <LabelChangeField />
      <ColorPalette />
      <OperateEdgeButton />
    </Box>
  );
};
