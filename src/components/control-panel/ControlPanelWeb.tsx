import React from "react";
import styled from "styled-components";

import { ACTIONS, AppAction, AppState } from "store/reducer";

interface ControlPanelWebProps {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const ControlPanelWeb: React.FunctionComponent<ControlPanelWebProps> = ({
  state,
  dispatch,
}) => {
  return (
    <ControlPanelWrapper onMouseDown={(event) => event.stopPropagation()}>
      <Button
        color="orange"
        onClick={() => dispatch({ type: ACTIONS.sound, data: !state.sound })}
      >
        Sound
      </Button>

      {/* <Button
        color="red"
        // TODO: recall
        // onClick={() => dispatch({ type: ACTIONS.sound, data: !state.sound })}
      >
        Come here!
      </Button>

      <Button
        color="blue"
        onClick={() => dispatch({ type: ACTIONS.play, data: !state.play })}
      >
        {state.play ? "Sleep" : "Wake up"}
      </Button> */}
    </ControlPanelWrapper>
  );
};

const ControlPanelWrapper = styled.div`
  z-index: 1;
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  display: flex;
  flex-direction: column;
  width: 100px;
`;

interface ButtonProps {
  color: string;
}

const Button = styled.button<ButtonProps>`
  border: 2px solid white;
  color: white;
  padding: 0.25rem 1rem;
  background-color: ${({ color }) => color};
  margin-bottom: 0.5rem;
`;

export default ControlPanelWeb;
