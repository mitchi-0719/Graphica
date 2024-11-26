import * as d3 from "d3";
import { useEffect, useRef } from "react";

export const Node = ({ node, updateNodePosition }) => {
  const nodeRef = useRef(null);

  useEffect(() => {
    const drag = d3
      .drag()
      .on("start", (event) => {
        d3.select(event.sourceEvent.target).raise().attr("stroke", "red");
      })
      .on("drag", (event) => {
        const newX = event.x;
        const newY = event.y;
        d3.select(nodeRef.current).attr(
          "transform",
          `translate(${newX},${newY})`
        );
        updateNodePosition(node.id, newX, newY);
      })
      .on("end", (event) => {
        d3.select(event.sourceEvent.target).attr("stroke", "black");
      });

    d3.select(nodeRef.current).call(drag);
  }, [node, updateNodePosition]);

  return (
    <g ref={nodeRef} transform={`translate(${node.x},${node.y})`}>
      <circle r="30" fill="white" stroke="black" />
      <text textAnchor="middle" dominantBaseline="middle">
        {node.id}
      </text>
    </g>
  );
};
