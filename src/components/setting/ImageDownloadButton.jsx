import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { DownloadSvg } from "../../features/DownloadSvg";
import { useState } from "react";
export const ImageDownloadButton = ({ svgRef }) => {
  const [img, setImg] = useState("png");

  const handleChange = (event) => {
    setImg(event.target.value);
  };
  return (
    <Box display={"flex"}>
      <Box>
        <FormControl fullWidth>
          <InputLabel id="select-label">拡張子</InputLabel>
          <Select
            labelId="select-label"
            value={img}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={"png"}>png</MenuItem>
            <MenuItem value={"jpeg"}>jpeg</MenuItem>
          </Select>
        </FormControl>
        <Button onClick={() => DownloadSvg(svgRef, img)}>ダウンロード</Button>
      </Box>
    </Box>
  );
};
