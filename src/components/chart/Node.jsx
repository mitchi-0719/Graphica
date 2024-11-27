import { useCallback, useEffect, useState } from "react";

export const Node = ({ node, updateNodePosition, onSelect, isSelected, r }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = useCallback(
    (event) => {
      setIsDragging(true);
      setOffset({
        x: event.clientX - node.x,
        y: event.clientY - node.y,
      });
    },
    [node.x, node.y]
  );

  const handleMouseMove = useCallback(
    (event) => {
      if (isDragging) {
        updateNodePosition(
          node.id,
          event.clientX - offset.x,
          event.clientY - offset.y
        );
      }
    },
    [isDragging, node.id, offset.x, offset.y, updateNodePosition]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <g
      transform={`translate(${node.x},${node.y})`}
      onClick={() => onSelect(node.id)}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ cursor: "move" }}
    >
      <circle r={r} fill="white" stroke={isSelected ? "red" : "black"} />
      <text
        textAnchor="middle"
        dominantBaseline="middle"
        style={{ userSelect: "none" }}
      >
        {node.id}
      </text>
    </g>
  );
};
