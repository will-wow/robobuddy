import React from "react";
import Wheel from "./Wheel";

interface RobotProps {}

const Robot: React.FunctionComponent<RobotProps> = () => {
  return (
    <a-entity
      id="robot"
      position="0 0.1 -3"
      chase-laser="laser: #laser-point"
      sound__happy="src: #happy; on: happy"
      sound__sad="src: #sad; on: sad"
      sound__motor="src: #motor; loop: true"
    >
      <a-entity
        id="robot-head"
        geometry="width: 0.4; height: 0.2; depth: 0.2"
        material="color: silver"
        position="0 0.4 0.15"
        rotation="15 0 0"
      >
        <a-entity id="eyes" position="0 0 0.1">
          <a-entity id="eye-left" mixin="eye" position="-0.15 0 0"></a-entity>

          <a-entity id="eye-right" mixin="eye" position="0.15 0 0"></a-entity>
        </a-entity>

        <a-entity
          id="state-light"
          position="0 0.125 0"
          geometry="width: 0.05; height: 0.05; depth: 0.05"
          material="color: red; transparent: true; opacity: 0.5"
          light="type: point; color: red; intensity: 0.25; distance: 1"
        ></a-entity>
      </a-entity>

      <a-entity
        id="eye-stalk"
        geometry="primitive: cylinder; height: 0.2; radius: 0.02"
        material="color: silver"
        position="0 0.25 0.15"
      ></a-entity>

      <a-entity
        id="robot-body"
        geometry="height: 0.2; width: 0.2; depth: 0.4"
        material="color: silver"
        position="0 0.1 0"
      ></a-entity>

      <Wheel side="right" direction="front" />
      <Wheel side="left" direction="front" />
      <Wheel side="right" direction="back" />
      <Wheel side="left" direction="back" />
    </a-entity>
  );
};

export default Robot;
