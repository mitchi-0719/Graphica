import { Box } from "@mui/material";
import { Header } from "./common/Header";
import { Setting } from "./components/setting/Setting";
import { Chart } from "./components/chart/Chart";

const App = () => {
  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <Header />
      <Box display="flex" flex={1} zIndex={-1}>
        <Setting />
        <Chart />
      </Box>
    </Box>
  );
};

export default App;
