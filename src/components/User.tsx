import React from "react";
import { Entity } from "aframe-react";

import { AppState, AppAction, ACTIONS } from "store/reducer";
import { renderData } from "lib/entity";

interface UserProps {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const User: React.FunctionComponent<UserProps> = ({ state, dispatch }) => {
  React.useEffect(() => {
    document.addEventListener("mousedown", () => {
      dispatch({ type: ACTIONS.pointStart });
    });

    document.addEventListener("mouseup", () => {
      dispatch({ type: ACTIONS.pointEnd });
    });
  }, [dispatch]);

  const leftHandEvents = React.useMemo(
    () => ({
      controllerconnected: () =>
        dispatch({ type: ACTIONS.controllerConnectedLeft }),
    }),
    [dispatch]
  );

  const rightHandEvents = React.useMemo(
    () => ({
      abuttondown: () => dispatch({ type: ACTIONS.pointStart }),
      abuttonup: () => dispatch({ type: ACTIONS.pointEnd }),
      controllerconnected: () =>
        dispatch({ type: ACTIONS.controllerConnectedRight }),
    }),
    [dispatch]
  );

  return (
    <>
      <Entity
        id="leftHand"
        tracked-controls="hand: left"
        visible={state.controller.left}
        ui={renderData({ uiShown: state.uiShown })}
        events={leftHandEvents}
      >
        <a-entity
          position="0.3 0 0"
          rotation="0 0 -90"
          show-buttons={state.uiShown}
        ></a-entity>
      </Entity>

      <a-entity
        id="fixed-control-panel"
        position="-1 1.6"
        rotation="0 90 0"
        show-buttons={!state.controller.left}
      ></a-entity>

      <Entity
        id="rightHand"
        tracked-controls="hand: right"
        laser-controls=""
        raycaster="objects: .floor; showLine: true"
        line="color: red"
        visible={state.controller.right}
        events={rightHandEvents}
      ></Entity>

      <a-entity id="rig" movement-controls="">
        <a-entity
          camera=""
          position="0 1.6 0"
          look-controls="pointerLockEnabled: true"
          raycaster={renderData({
            objects: ".floor",
            enabled: !state.controller.right,
          })}
        ></a-entity>
      </a-entity>

      <a-entity
        id="laser-point"
        position="-3 0 -5"
        geometry="primitive: cylinder; radius: 0.1; height: 0.01"
        material="color: red"
        visible={state.pointing}
      ></a-entity>
    </>
  );
};

export default React.memo(User);
