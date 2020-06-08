import React from "react";
import { Scene } from "aframe-react";

import Assets from "./Assets";
import Robot from "./Robot";
import World from "./World";
import User from "./User";
import { reducer, initialState } from "store/reducer";

function AppScene() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <Scene>
      <Assets />

      <World state={state} />
      <Robot />
      <User state={state} dispatch={dispatch} />
    </Scene>
  );
}

export default AppScene;
