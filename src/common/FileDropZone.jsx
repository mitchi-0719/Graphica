import { UploadFile } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { useState, useRef } from "react";

export const FileDropAndClickZone = ({ onChange }) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const onDragEnter = (e) => {
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragActive(true);
    }
  };

  const onDragLeave = () => {
    setIsDragActive(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragActive(false);
    if (e.dataTransfer.files !== null && e.dataTransfer.files.length > 0) {
      if (e.dataTransfer.files.length === 1) {
        const file = e.dataTransfer.files[0];
        if (file.name.endsWith(".json")) {
          onChange(e.dataTransfer.files);
        } else {
          alert("拡張子が.jsonのファイルのみ許可されています！");
        }
      } else {
        alert("ファイルは１個まで！");
      }
      e.dataTransfer.clearData();
    }
  };

  const onBoxClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Box
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      onClick={onBoxClick}
      sx={{
        width: "100%",
        height: "100px",
        border: "2px dashed #ccc",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: isDragActive ? "#e0e0e0" : "transparent",
        cursor: "pointer",
        transition: "background-color 0.3s",
        "&:active": {
          backgroundColor: "#d0d0d0",
        },
      }}
    >
      <input
        type="file"
        accept=".json"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={(e) => onChange(e.target.files)}
      />
      <UploadFile color="primary" />
      <Typography color="primary">ファイルを選択</Typography>
    </Box>
  );
};
