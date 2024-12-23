import { useContext } from "react";
import { ImportContext } from "../../context/importContext/ImportContext";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { Results } from "./Results";
import { FileDropAndClickZone } from "../../common/FileDropZone";
import { setImportFileData } from "../../features/import/setImportFileData";
import { fileImport } from "../../features/import/fileImport";
import { GraphContext } from "../../context/graphContext/GraphContext";
import { isEmptyObject } from "../../features/isEmptyObject";
import { JsonDescription } from "./JsonDescription";

export const GraphImportDialog = () => {
  const {
    isOpenDialog,
    handleCloseDialog,
    importData,
    setImportData,
    fileName,
    setFileName,
  } = useContext(ImportContext);

  const { nodeId, setNodeId, addNode, clearNode, addEdge, clearEdge } =
    useContext(GraphContext);

  if (!isOpenDialog) {
    return null;
  }

  const handleImport = () => {
    clearNode();
    clearEdge();
    fileImport(importData, nodeId, setNodeId, addNode, addEdge);
    handleCloseDialog();
  };

  return (
    <Dialog open={isOpenDialog} onClose={handleCloseDialog}>
      <Box width={600}>
        <DialogTitle marginRight="auto">
          <Typography fontSize="2rem" fontWeight="bold">
            グラフをインポート
          </Typography>
          <Box borderBottom={1} borderColor="divider" />
        </DialogTitle>
        <DialogContent sx={{ overflow: "auto" }}>
          <JsonDescription />
          <FileDropAndClickZone
            onChange={(e) => setImportFileData(e, setImportData, setFileName)}
          />
        </DialogContent>
        <Results fileName={fileName} data={importData} />
        <DialogActions>
          <Box display="flex" justifyContent="flex-end" width="100%" gap={1}>
            <Box>
              <Button onClick={handleCloseDialog}>キャンセル</Button>
            </Box>
            <Box>
              <Button
                variant="contained"
                disabled={isEmptyObject(importData)}
                onClick={handleImport}
              >
                インポート
              </Button>
            </Box>
          </Box>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
