import React from "react";
import { createGlobalStyle } from "styled-components";

import { reducer, initialState, ACTIONS } from "store/reducer";

import Assets from "./Assets";
import Robot from "./robot/Robot";
import World from "./World";
import User from "./User";
import ControlPanelWeb from "./control-panel/ControlPanelWeb";
import { Scene } from "aframe-react";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Open Sans', sans-serif;
  }
`;

function AppScene() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const sceneEvents = React.useMemo(
    () => ({
      loaded: () => dispatch({ type: ACTIONS.loaded }),
    }),
    [dispatch]
  );

  return (
    <>
      <GlobalStyle />
      <Scene events={sceneEvents}>
        <Assets />

        <World state={state} />
        <Robot state={state} />
        <User state={state} dispatch={dispatch} />

        {state.loaded && <ControlPanelWeb state={state} dispatch={dispatch} />}
      </Scene>
    </>
  );
}

export default AppScene;
