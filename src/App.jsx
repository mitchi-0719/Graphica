import { Box } from "@mui/material";
import { Header } from "./common/Header";
import { Setting } from "./components/setting/Setting";
import { Graph } from "./components/graph/Graph";

const App = () => {
  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <Header />
      <Box display="flex" flex={1} zIndex={-1}>
        <Setting />
        <Graph />
      </Box>
    </Box>
  );
};

export default App;
