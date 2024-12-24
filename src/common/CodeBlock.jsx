import { Box } from "@mui/material";

export const CodeBlock = ({ code, maxHeight }) => {
  return (
    <Box
      sx={{
        maxHeight: maxHeight,
        position: "relative",
        backgroundColor: "#f5f5f5",
        color: "#000",
        borderRadius: "8px",
        padding: "16px",
        fontFamily: "'Fira Code', monospace",
        overflow: "auto",
        border: "1px solid lightgray",
      }}
    >
      <pre style={{ margin: 0, fontSize: "12px" }}>
        <code>{`${code}`}</code>
      </pre>
    </Box>
  );
};
