import { Box, Button, Typography } from "@mui/material";
import { GraphExportButton } from "../components/export/GraphExportButton";
import { GraphImportButton } from "../components/import/GraphImportButton";
import { Menu } from "@mui/icons-material";

export const Header = ({ toggleSideMenu }) => {
  return (
    <Box
      component="header"
      bgcolor="lightgray"
      display="flex"
      justifyContent="space-between"
      padding={1}
      boxShadow={3}
    >
      <Button color="lightgray" onClick={toggleSideMenu}>
        <Menu />
      </Button>
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
