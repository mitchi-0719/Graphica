import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { GraphContext } from "../../context/graphContext/GraphContext";
import {
  isNotNullOrUndefined,
  isNullOrUndefined,
} from "../../hooks/nullOrUndefined";

export const OperateEdgeButton = () => {
  const { nodes, addEdge, deleteEdge, selectEdgeId } = useContext(GraphContext);
  const [source, setSource] = useState("");
  const [target, setTarget] = useState("");

  const handleAddClick = () => {
    isNotNullOrUndefined(source) &&
      isNotNullOrUndefined(target) &&
      source !== target &&
      addEdge({ source, target });
  };

  const handleDeleteClick = () => {
    deleteEdge(selectEdgeId);
  };

  return (
    <Box>
      <Typography variant="h7">エッジの追加</Typography>
      <Box display="flex" flexDirection="row" flex={1}>
        <FormControl fullWidth>
          <InputLabel id="source-select">Source</InputLabel>
          <Select
            labelId="source-select"
            id="demo-simple-select"
            value={source}
            label="Age"
            onChange={(e) => setSource(e.target.value)}
          >
            {nodes.map((node) => (
              <MenuItem value={node.id} key={node.id}>
                {node.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="target-select">target</InputLabel>
          <Select
            labelId="target-select"
            id="demo-simple-select"
            value={target}
            label="Age"
            onChange={(e) => setTarget(e.target.value)}
          >
            {nodes.map((node) => (
              <MenuItem value={node.id} key={node.id}>
                {node.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Button onClick={handleAddClick}>エッジを追加</Button>
      <Button
        disabled={isNullOrUndefined(selectEdgeId)}
        onClick={handleDeleteClick}
      >
        エッジを削除
      </Button>
    </Box>
  );
};
