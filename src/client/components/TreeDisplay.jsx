import React from "react";
import Tree from "react-d3-tree";
import useExtensionStore from "../store/useExtensionStore";
import { useStore } from "zustand";
import hierarchyConv from "../algorithms/hierarchyConv";
import "../styles/TreeDisplay.scss";

export const TreeDisplay = () => {
  const { previousStates, currState } = useStore(useExtensionStore);

  let stateHeirarchy;
  if (Object.keys(currState).length > 0) {
    stateHeirarchy = hierarchyConv(currState);
  } else {
    stateHeirarchy = hierarchyConv(previousStates[previousStates.length - 1]);
  }

  const renderForeignObjectNode = ({ nodeDatum, toggleNode }) => (
    <g>
      <circle
        r={10}
        onClick={toggleNode}
      ></circle>
      <text
        fill="black"
        stroke="black"
        strokeWidth="1"
        y="4"
        x={nodeDatum.children ? "-13" : "13"}
        textAnchor={nodeDatum.children ? "end" : "start"}
      >
        {nodeDatum.name}
      </text>
      {nodeDatum.attributes && (
        <text
          fill="black"
          stroke="black"
          strokeWidth="1"
          x="20"
          dy="20"
        >
          value: {nodeDatum.attributes.value}
        </text>
      )}
    </g>
  );

  return (
    <div
      id="treeWrapper"
      style={{ width: "100%", height: "100vh" }}
    >
      <Tree
        data={stateHeirarchy}
        rootNodeClassName="node__root"
        branchNodeClassName="node__branch"
        leafNodeClassName="node__leaf"
        depthFactor={180}
        enableLegacyTransitions={true}
        transitionDuration={750}
        separation={{ siblings: 0.2, nonSiblings: 0.5 }}
        translate={{ x: 100, y: 350 }}
        scaleExtent={{ max: 1, min: 0.1 }}
        nodeSize={{ x: 200, y: 200 }}
        renderCustomNodeElement={(rd3tProps) =>
          renderForeignObjectNode({ ...rd3tProps })
        }
      />
    </div>
  );
};
