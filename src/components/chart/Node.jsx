import { useCallback, useEffect, useState } from "react";
import { r } from "../../constants/nodeConst";

export const Node = ({ node, updateNodePosition, onSelect, isSelected }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const getEventCoordinates = (event) => {
    if (event.touches) {
      const touch = event.touches[0];
      return { x: touch.clientX, y: touch.clientY };
    }
    return { x: event.clientX, y: event.clientY };
  };

  const handleStart = useCallback(
    (event) => {
      const { x, y } = getEventCoordinates(event);
      setIsDragging(true);
      setOffset({
        x: x - node.x,
        y: y - node.y,
      });
    },
    [node.x, node.y]
  );

  const handleMove = useCallback(
    (event) => {
      if (isDragging) {
        const { x, y } = getEventCoordinates(event);
        updateNodePosition(node.id, x - offset.x, y - offset.y);
      }
    },
    [isDragging, node.id, offset.x, offset.y, updateNodePosition]
  );

  const handleEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    const removeEvent = () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("touchend", handleEnd);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMove);
      document.addEventListener("mouseup", handleEnd);
      document.addEventListener("touchmove", handleMove);
      document.addEventListener("touchend", handleEnd);
    } else {
      removeEvent();
    }

    return () => {
      removeEvent();
    };
  }, [isDragging, handleMove, handleEnd]);

  return (
    <g
      transform={`translate(${node.x},${node.y})`}
      onClick={() => onSelect(node.id)}
      onMouseDown={handleStart}
      onTouchStart={handleStart}
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
