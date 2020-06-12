import React from "react";
import styled from "styled-components";

import { BaseControlPanelProps } from "./BaseControlPanel";

const ControlPanelWeb: React.FunctionComponent<BaseControlPanelProps> = ({
  state,
  onPlay,
  onSound,
  onRecall,
}) => {
  return (
    <ControlPanelWrapper onMouseDown={(event) => event.stopPropagation()}>
      <Header>Robobuddy</Header>

      <Button color="green" onClick={onPlay}>
        {state.play ? "Pause" : "Play"}
      </Button>

      <Button color="orange" onClick={onSound}>
        {state.sound ? "Sound On" : "Muted"}
      </Button>

      <Button color="red" onClick={onRecall}>
        Come here!
      </Button>

      <Text margin>Controls:</Text>

      <Text>Escape: Show Menu</Text>
      <Text>Click: Turn on laser pointer</Text>
      <Text>R: Recall robot</Text>
    </ControlPanelWrapper>
  );
};

const ControlPanelWrapper = styled.div`
  z-index: 1;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 2rem;
  background-color: rgba(223, 226, 242, 0.2);
  display: flex;
  flex-direction: column;
  text-align: center;
  max-width: 100%;
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

const Header = styled.h2`
  color: white;
  margin-top: 0;
`;

interface TextProps {
  margin?: boolean;
}

const Text = styled.p<TextProps>`
  color: white;
  margin-top: ${({ margin }) => (margin ? "1rem" : 0)};
  margin-bottom: ${({ margin }) => (margin ? "1rem" : 0)};
`;

export default ControlPanelWeb;
