import { Box, Button, Typography } from "@mui/material";
import { useIsSmallDevice } from "../../hooks/Responsive";
import { GraphContext } from "../../context/graphContext/GraphContext";
import { useContext } from "react";
import { LabelChangeField } from "./LabelChangeField";
import { ColorPalette } from "./ColorPalette";
import { OperateEdgeButton } from "./OperateEdgeButton";
import { OperateNodeButton } from "./OperateNodeButton";
import { ModeToggleButton } from "./ModeToggleButton";
import { isNullOrUndefined } from "../../hooks/nullOrUndefined";
import { ArrangeBinaryTreeButton } from "./ArrangeBinaryTreeButton";

export const Setting = () => {
  const { nodes, addNode, deleteNode, selectEdgeId, subdivision, contraction } =
    useContext(GraphContext);
  const isSmallDevice = useIsSmallDevice();

  const handlePlusClick = () => {
    addNode({});
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
        <OperateNodeButton
          onPlusChange={handlePlusClick}
          onMinusChange={handleMinusClick}
          value={nodes.length}
        />
      </Box>
      <LabelChangeField />
      <ColorPalette />
      <OperateEdgeButton />
      <ModeToggleButton />

      <Box>
        <Typography variant="h7">グラフの操作</Typography>
        <Box display="flex" justifyContent="space-around">
          <Button
            onClick={subdivision}
            variant="contained"
            disabled={isNullOrUndefined(selectEdgeId)}
          >
            細分
          </Button>
          <Button
            onClick={contraction}
            variant="contained"
            disabled={isNullOrUndefined(selectEdgeId)}
          >
            縮約
          </Button>
        </Box>
      </Box>
      <ArrangeBinaryTreeButton />
    </Box>
  );
};
