import { useState } from "react";
import { ImportContext } from "./ImportContext";

export const ImportContextProvider = ({ children }) => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [importData, setImportData] = useState({});
  const [fileName, setFileName] = useState("");

  const handleOpenDialog = () => {
    setIsOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setIsOpenDialog(false);
  };
  const contextValue = {
    isOpenDialog,
    handleOpenDialog,
    handleCloseDialog,
    importData,
    setImportData,
    fileName,
    setFileName,
  };
  return (
    <ImportContext.Provider value={contextValue}>
      {children}
    </ImportContext.Provider>
  );
};
