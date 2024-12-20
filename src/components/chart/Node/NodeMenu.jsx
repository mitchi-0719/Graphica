import { Box, Button, Typography } from "@mui/material";

export const NodeMenu = ({
  isOpen,
  sideMenuPosition,
  handleSideMenuClose,
  handleSideMenuDelete,
}) => {
  if (!isOpen) return null;
  return (
    <Box
      sx={{
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
        <Typography variant="h5" textAlign="left">
          Menu
        </Typography>
        {/* ここの下に内容を書く */}
        <Button onClick={handleSideMenuDelete}>ノードの消去</Button>
        <Box>
          <Button onClick={handleSideMenuClose}>閉じる</Button>
        </Box>
      </Box>
    </Box>
  );
};
