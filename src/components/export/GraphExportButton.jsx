import { Button } from "@mui/material";
import { GraphContext } from "../../context/graphContext/GraphContext";
import { useContext } from "react";

export const GraphExportButton = () => {
  const { nodes, edges } = useContext(GraphContext);
  const handleExport = () => {
    const graphData = { nodes, edges };
    const json = JSON.stringify(graphData, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "graph.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Button variant="contained" size="small" onClick={handleExport}>
      Export
    </Button>
  );
};
