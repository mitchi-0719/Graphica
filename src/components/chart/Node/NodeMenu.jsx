import { Delete } from "@mui/icons-material";
import { Box, Button, Divider, Typography } from "@mui/material";
import { LabelChangeField } from "../../setting/LabelChangeField";
import { ColorPalette } from "../../setting/ColorPalette";
import { OperateEdgeButton } from "../../setting/OperateEdgeButton";

export const NodeMenu = ({
  nodeMenuRef,
  isOpen,
  sideMenuPosition,
  handleSideMenuClose,
  onDelete,
}) => {
  if (!isOpen) return null;

  return (
    <Box
      ref={nodeMenuRef}
      sx={{
        width: 200,
        position: "absolute",
        top: sideMenuPosition.y,
        left: sideMenuPosition.x,
        backgroundColor: "white",
        padding: 2,
        border: "1px solid #ccc",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box mb={2}>
        <Typography variant="subtitle1" gutterBottom></Typography>
        <LabelChangeField />
      </Box>

      <Divider sx={{ marginY: 2 }} />

      <Box mb={2}>
        <Typography variant="subtitle1" gutterBottom></Typography>
        <ColorPalette />
      </Box>

      <Box mb={2}>
        <Typography variant="subtitle1" gutterBottom></Typography>
        <OperateEdgeButton />
      </Box>

      <Box>
        <Button
          size="small"
          variant="contained"
          fullWidth
          startIcon={<Delete />}
          onClick={onDelete}
        >
          このノードを削除
        </Button>
      </Box>

      <Divider sx={{ marginY: 2 }} />

      <Box display="flex" justifyContent="flex-end">
        <Button onClick={handleSideMenuClose}>閉じる</Button>
      </Box>
    </Box>
  );
};
