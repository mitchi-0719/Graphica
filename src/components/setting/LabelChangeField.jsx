import { Box, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import { GraphContext } from "../../context/graphContext/GraphContext";

export const LabelChangeField = () => {
  const { nodes, selectNodeId, updateNode } = useContext(GraphContext);
  return (
    <Box>
      <Typography variant="h7">ラベルの変更</Typography>
      <TextField
        disabled={selectNodeId === null}
        value={nodes.find((node) => node.id === selectNodeId)?.label ?? ""}
        size="small"
        onChange={(e) => updateNode(selectNodeId, { label: e.target.value })}
      />
    </Box>
  );
};
