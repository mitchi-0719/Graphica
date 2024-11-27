import { useState, useEffect, useCallback } from "react";

export const useSvgSize = (svgRef) => {
  const [size, setSize] = useState({ width: 800, height: 800 });

  const updateSize = useCallback(() => {
    if (svgRef.current) {
      const { width, height } = svgRef.current.getBoundingClientRect();
      setSize({ width, height });
    }
  }, [svgRef]);

  useEffect(() => {
    if (!svgRef.current) return;

    updateSize();

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(svgRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [svgRef, updateSize]);

  return { width: size.width, height: size.height };
};
