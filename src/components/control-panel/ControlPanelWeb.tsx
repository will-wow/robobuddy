import React from "react";
import styled from "styled-components";

import { BaseControlPanelProps } from "./BaseControlPanel";

const ControlPanelWeb: React.FunctionComponent<BaseControlPanelProps> = ({
  state,
  onSound,
  onRecall,
}) => {
  return (
    <ControlPanelWrapper onMouseDown={(event) => event.stopPropagation()}>
      <Button color="orange" onClick={onSound}>
        {state.sound ? "Sound" : "Sound Off"}
      </Button>

      <Button color="red" onClick={onRecall}>
        Come here!
      </Button>
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
