import { Box } from "@mui/material";
import { useIsSmallDevice } from "../../hooks/Responsive";

export const Setting = () => {
  const isSmallDevice = useIsSmallDevice();

  return (
    <Box
      width={isSmallDevice ? "100%" : "200px"}
      border="1px solid black"
      boxShadow={3}
      padding={2}
      bgcolor="white"
    >
      <Box>Setting</Box>
    </Box>
  );
};
