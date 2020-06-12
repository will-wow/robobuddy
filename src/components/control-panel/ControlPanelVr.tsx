import React from "react";
import { Entity } from "aframe-react";

import VrButton from "./VrButton";
import { BaseControlPanelProps } from "./BaseControlPanel";

const ControlPanelVr: React.FunctionComponent<BaseControlPanelProps> = ({
  state,
  onSound,
}) => {
  return (
    <Entity
      id="control-panel-vr"
      geometry="primitive: plane; height: 0.5; width: 0.75"
      material="color: #dfe2f2; transparent: true; opacity: 0.2"
    >
      <Entity
        id="ui-viewer-row"
        layout="type: line; plane: xy; margin: 0.25; align: center"
      >
        <VrButton color="orange" onClick={onSound}>
          {state.sound ? "Sound" : "Sound Off"}
        </VrButton>
      </Entity>
    </Entity>
  );
};

export default ControlPanelVr;
