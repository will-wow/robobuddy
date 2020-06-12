import React from "react";
import { Entity } from "aframe-react";

import { AppState, AppAction, ACTIONS } from "store/reducer";

import ControlPanel from "./control-panel/ControlPanel";

interface UserProps {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  onRecall(): void;
}

const User: React.FunctionComponent<UserProps> = ({
  state,
  dispatch,
  onRecall,
}) => {
  React.useEffect(() => {
    window.addEventListener("mousedown", () => {
      dispatch({ type: ACTIONS.pointStart });
    });

    window.addEventListener("mouseup", () => {
      dispatch({ type: ACTIONS.pointEnd });
    });
  }, [dispatch]);

  const leftHandEvents = React.useMemo(
    () => ({
      controllerconnected: () => {
        dispatch({ type: ACTIONS.controllerConnectedLeft });
      },
      showUi: () => dispatch({ type: ACTIONS.showUi }),
      hideUi: () => dispatch({ type: ACTIONS.hideUi }),
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
        id="fixed-control-panel"
        position="-1 1.6"
        rotation="0 90 0"
        show-buttons={!state.controller.left}
      >
        <ControlPanel
          vr
          state={state}
          dispatch={dispatch}
          onRecall={onRecall}
        />
      </Entity>

      <Entity
        id="leftHand"
        hand-controls="hand: left"
        visible={state.controller.left}
        control-panel-vr={{ uiShown: state.uiShown }}
        events={leftHandEvents}
      >
        <Entity
          position="0.3 0 0"
          rotation="0 0 -90"
          show-buttons={state.uiShown}
        >
          <ControlPanel
            vr
            state={state}
            dispatch={dispatch}
            onRecall={onRecall}
          />
        </Entity>
      </Entity>

      <Entity
        id="rightHand"
        hand-controls="hand: right"
        laser-controls=""
        aabb-collider="objects: #robot, .touch-button:not(.hidden)"
        raycaster="objects: .floor, .action-button:not(.hidden); showLine: false"
        visible={state.controller.right}
        events={rightHandEvents}
      ></Entity>

      <Entity id="rig" movement-controls="">
        <Entity
          id="player"
          camera=""
          position="0 1.6 0"
          look-controls={{ pointerLockEnabled: true, enabled: state.play }}
          pointer-lock={{ play: state.play }}
          raycaster={{
            objects: ".floor",
            enabled: !state.controller.right,
          }}
          events={{
            "close-ui": () => dispatch({ type: ACTIONS.play, data: true }),
            "open-ui": () => dispatch({ type: ACTIONS.play, data: false }),
          }}
        ></Entity>
      </Entity>

      <Entity
        id="laser-point"
        position="-3 0 -5"
        geometry="primitive: cylinder; radius: 0.1; height: 0.01"
        material="color: red"
        visible={state.pointing}
      ></Entity>
    </>
  );
};

export default React.memo(User);
