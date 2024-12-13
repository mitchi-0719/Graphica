import { useCallback, useEffect, useState } from "react";

export const Node = ({
  node,
  moveNode,
  onSelect,
  isSelected,
  handleRightClick,
}) => {
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
    [node.x, node.y],
  );

  const handleMove = useCallback(
    (event) => {
      if (isDragging) {
        const { x, y } = getEventCoordinates(event);
        moveNode(node.id, x - offset.x, y - offset.y, node.r);
      }
    },
    [isDragging, node.id, offset.x, offset.y, moveNode],
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
      onContextMenu={(e) => handleRightClick(e, node.id)}
      style={{ cursor: "move" }}
    >
      <circle
        r={node.r}
        fill="white"
        stroke={node?.color ?? "black"}
        strokeWidth={isSelected ? 5 : 3}
      />
      <text
        textAnchor="middle"
        dominantBaseline="middle"
        style={{ userSelect: "none" }}
      >
        {node.label ?? ""}
      </text>
    </g>
  );
};
