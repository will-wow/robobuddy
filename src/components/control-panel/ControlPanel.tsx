import React from "react";

import { ACTIONS, AppAction, AppState } from "store/reducer";
import ControlPanelVr from "./ControlPanelVr";
import ControlPanelWeb from "./ControlPanelWeb";
import { BaseControlPanelProps } from "./BaseControlPanel";

interface ControlPanelProps {
  vr: boolean;
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  onRecall(): void;
}

const ControlPanel: React.FunctionComponent<ControlPanelProps> = ({
  vr,
  state,
  dispatch,
  onRecall = () => {},
}) => {
  const handlePlay = () => dispatch({ type: ACTIONS.play, data: !state.play });

  const handleSound = () =>
    dispatch({ type: ACTIONS.sound, data: !state.sound });

  const props: BaseControlPanelProps = {
    state,
    onRecall,
    onPlay: handlePlay,
    onSound: handleSound,
  };

  if (vr && state.vr) {
    return <ControlPanelVr {...props} />;
  } else if (!vr && !state.vr) {
    return <ControlPanelWeb {...props} />;
  } else {
    return null;
  }
};

export default ControlPanel;
