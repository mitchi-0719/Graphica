import { Box, Typography } from "@mui/material";
import { CodeBlock } from "../../common/CodeBlock";

const jsonTemplate = `{
  nodes: [
    {
      id?: number(ノードのユニークなid),
      x?: number(ノードのx座標),
      y?: number(ノードのy座標),
      r?: number(ノードの半径),
      label?: string(ラベル),
      color?: string(色名orカラーコード),
    }
  ],
  edges: [
      id?: number(エッジのユニークなid),
      source?: number(始点のノードid),
      target?: number(終点のノードid),
      label?: string(ラベル),
      weight?: string(重み),
      color?: string(エッジの色),
  ]
}`;

export const JsonDescription = () => {
  return (
    <Box marginBottom={2}>
      <Typography variant="h7">データの形式</Typography>
      <CodeBlock code={jsonTemplate} maxHeight="180px" />
    </Box>
  );
};
