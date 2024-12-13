import { Box, Button, Typography } from "@mui/material";

export const NodeMenu = ({ isOpen, sideMenuPosition, handleSideMenuClose }) => {
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
        <Box>
          <Button onClick={handleSideMenuClose}>閉じる</Button>
        </Box>
      </Box>
    </Box>
  );
};
