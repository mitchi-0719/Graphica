import { Box, Typography } from "@mui/material";
import { CodeBlock } from "../../common/CodeBlock";
import { isEmptyObject } from "../../features/isEmptyObject";

export const Results = ({ fileName, data }) => {
  if (isEmptyObject(data)) return null;
  const json = JSON.stringify(data, null, 2);
  return (
    <Box marginX={2}>
      <Typography variant="h6">{fileName}</Typography>
      <CodeBlock code={json} />
    </Box>
  );
};
