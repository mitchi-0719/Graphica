import { Box, Button, Typography } from "@mui/material";

export const Header = () => {
  return (
    <Box
      component="header"
      bgcolor="lightgray"
      display="flex"
      justifyContent="space-between"
      padding={1}
    >
      <Typography component="h1" variant="h4">
        Graphica
      </Typography>
      <Box display="flex" gap={1}>
        <Button variant="contained">Import</Button>
        <Button variant="contained">Login</Button>
      </Box>
    </Box>
  );
};
