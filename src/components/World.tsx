import React from "react";

import { AppState } from "store/reducer";
import { renderData } from "lib/entity";

interface WorldProps {
  state: AppState;
}

const World: React.FunctionComponent<WorldProps> = ({ state }) => {
  return (
    <>
      <a-entity
        id="world"
        environment={renderData({
          preset: "arches",
          shadow: true,
          active: !state.ar,
        })}
      ></a-entity>

      <a-entity
        id="floor"
        class="floor"
        laser-zone={renderData({
          laser: "#laser-point",
          pointing: state.pointing,
        })}
        geometry="primitive: cylinder; height: 0.01; radius: 10"
        position="0 -0.005 0"
        material="transparent: true; opacity: 0"
      ></a-entity>
    </>
  );
};

export default World;
