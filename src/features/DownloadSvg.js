export const DownloadSvg = (svgRef,format) => {
  if (!svgRef.current) return;
  const svgData = new XMLSerializer().serializeToString(svgRef.current);
  const svgBlob = new Blob([svgData], {
    type: "image/svg+xml;charset=utf-8",
  });
  const svgUrl = URL.createObjectURL(svgBlob);

  const canvas = document.createElement("canvas");
  canvas.width = svgRef.current.clientWidth;
  canvas.height = svgRef.current.clientHeight;

  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.onload = () => {
    ctx?.drawImage(img, 0, 0);
    URL.revokeObjectURL(svgUrl);
    
    const imageUrl = canvas.toDataURL(`image/${format}`);
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `graph.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  img.src = svgUrl;

};