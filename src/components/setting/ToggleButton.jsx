import { AddCircle, DoDisturbOn } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";

export const ToggleButton = ({ value, onPlusChange, onMinusChange }) => {
  return (
    <Box display="flex" padding={1}>
      <Button onClick={onMinusChange} variant="contained" size="small">
        <DoDisturbOn />
      </Button>
      <Box
        width="5rem"
        display="flex"
        alignItems="center"
        justifyContent="center"
        paddingX={1}
      >
        <Typography>{value}</Typography>
      </Box>
      <Button onClick={onPlusChange} variant="contained" size="small">
        <AddCircle />
      </Button>
    </Box>
  );
};
