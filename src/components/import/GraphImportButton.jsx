import { Button, Tooltip } from "@mui/material";
import { ImportContext } from "../../context/importContext/ImportContext";
import { useContext } from "react";

export const GraphImportButton = () => {
  const { handleOpenDialog } = useContext(ImportContext);

  return (
    <Tooltip title="JSON形式のデータをインポートする">
      <Button variant="contained" size="small" onClick={handleOpenDialog}>
        Import
      </Button>
    </Tooltip>
  );
};
