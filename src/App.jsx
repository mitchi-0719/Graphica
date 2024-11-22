import { Box } from "@mui/material";
import { Header } from "./common/Header";
import { Router } from "./Router";

const App = () => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header />
      <Box flex={1} bgcolor="">
        <Router />
      </Box>
    </Box>
  );
};

export default App;
