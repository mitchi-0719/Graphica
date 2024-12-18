import { useContext } from "react";
import { GraphContext } from "../../context/graphContext/GraphContext";
import { Box, Button, Typography } from "@mui/material";

export const ModeToggleButton = () => {
  const { isDrawEdgeMode, setIsDrawEdgeMode } = useContext(GraphContext);
  const handleClick = () => {
    setIsDrawEdgeMode((prev) => !prev);
  };
  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <Typography variant="h7">エッジの追加モード</Typography>
      <Button
        onClick={handleClick}
        variant={isDrawEdgeMode ? "contained" : "outlined"}
        size="small"
      >
        {isDrawEdgeMode ? "ON" : "OFF"}
      </Button>
    </Box>
  );
};
