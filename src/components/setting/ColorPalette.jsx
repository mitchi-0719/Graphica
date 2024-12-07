import { Box, Typography } from "@mui/material";
import { defaultColor } from "../../constants/nodeConst";
import { GraphContext } from "../../context/graphContext/GraphContext";
import { useContext } from "react";

export const ColorPalette = () => {
  const { nodes, selectNodeId, updateNode } = useContext(GraphContext);
  return (
    <Box>
      <Typography variant="h7">色の変更</Typography>
      <Box display="flex" flexWrap="wrap">
        {defaultColor.map((color) => (
          <ColorCircle
            key={color}
            disabled={selectNodeId === null}
            color={color}
            onClick={() => updateNode(selectNodeId, { color })}
            isSelected={
              nodes.find((node) => node.id === selectNodeId)?.color === color
            }
          />
        ))}
      </Box>
    </Box>
  );
};

const ColorCircle = ({ disabled, color, onClick, isSelected }) => {
  return (
    <Box
      margin={0.2}
      onClick={disabled ? null : onClick}
      sx={{
        width: "30px",
        height: "30px",
        bgcolor: color,
        border: `${isSelected ? "3px" : "1px"} solid black`,
        borderRadius: "50%",
        cursor: disabled ? "" : "pointer",
        opacity: disabled ? 0.4 : 1,
      }}
    />
  );
};
