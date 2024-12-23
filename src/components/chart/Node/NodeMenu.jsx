import { Delete } from "@mui/icons-material";
import { Box, Button, Divider } from "@mui/material";

export const NodeMenu = ({
  nodeMenuRef,
  isOpen,
  sideMenuPosition,
  handleSideMenuClose,
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
      <Box>
        <Button
          size="small"
          variant="contained"
          fullWidth
          startIcon={<Delete />}
        >
          このノードを削除
        </Button>
      </Box>
      <Divider />
      <Box display="flex" justifyContent="flex-end">
        <Button onClick={handleSideMenuClose}>閉じる</Button>
      </Box>
    </Box>
  );
};
