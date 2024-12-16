import { Box, Button, Typography } from "@mui/material";
import { GraphExportButton } from "../components/export/GraphExportButton";
import { GraphImportButton } from "../components/import/GraphImportButton";

export const Header = () => {
  return (
    <Box
      component="header"
      bgcolor="lightgray"
      display="flex"
      justifyContent="space-between"
      padding={1}
      boxShadow={3}
    >
      <Typography component="h1" variant="h4">
        Graphica
      </Typography>
      <Box display="flex" gap={1}>
        <GraphImportButton />
        <GraphExportButton />
        <Button variant="contained" size="small">
          Login
        </Button>
      </Box>
    </Box>
  );
};
