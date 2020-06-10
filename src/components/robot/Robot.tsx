import React, { MutableRefObject } from "react";
import { Entity as AframeEntity } from "aframe";
import { Entity } from "aframe-react";

import Wheel from "./Wheel";
import { AppState } from "store/reducer";
import { renderData } from "lib/entity";

interface RobotProps {
  state: AppState;
  robotRef: MutableRefObject<AframeEntity | null>;
}

const Robot: React.FunctionComponent<RobotProps> = ({ state, robotRef }) => {
  const volume = state.sound ? 1 : 0;
  return (
    <Entity
      id="robot"
      _ref={(entity: any) => (robotRef.current = entity)}
      data-aabb-collider-dynamic="true"
      chase-laser="laser: #laser-point"
      sound__happy={renderData({
        src: "#happy",
        on: "happy",
        volume,
      })}
      sound__sad={renderData({
        src: "#sad",
        on: "sad",
        volume,
      })}
      sound__motor={renderData({
        src: "#motor",
        on: "motor",
        volume,
      })}
    >
      <Entity
        id="robot-head"
        geometry="width: 0.4; height: 0.2; depth: 0.2"
        material="color: silver"
      >
        <Entity id="eyes" position="0 0 0.1">
          <Entity id="eye-left" mixin="eye" position="-0.15 0 0"></Entity>

          <Entity id="eye-right" mixin="eye" position="0.15 0 0"></Entity>
        </Entity>

        <Entity
          id="state-light"
          position="0 0.125 0"
          geometry="width: 0.05; height: 0.05; depth: 0.05"
          material="color: red; transparent: true; opacity: 0.5"
          light="type: point; color: red; intensity: 0.25; distance: 1"
        ></Entity>
      </Entity>

      <Entity
        id="eye-stalk"
        geometry="primitive: cylinder; height: 0.2; radius: 0.02"
        material="color: silver"
        position="0 0.25 0.15"
      ></Entity>

      <Entity
        id="robot-body"
        geometry="height: 0.2; width: 0.2; depth: 0.4"
        material="color: silver"
        position="0 0.1 0"
      ></Entity>

      <Wheel side="right" direction="front" />
      <Wheel side="left" direction="front" />
      <Wheel side="right" direction="back" />
      <Wheel side="left" direction="back" />
    </Entity>
  );
};

export default Robot;
