import { Entity } from "aframe";

import { CompDefinition } from "./type";

// import { ACTIONS } from "../store/state";

interface ControlPanelWebState {
  $controlPanel: Entity;
  $soundButton: Entity;
  $recallButton: Entity;
}

interface ControlPanelWebData {
  sound: boolean;
}

export const ControlPanelWeb: CompDefinition<
  ControlPanelWebData,
  ControlPanelWebState
> = {
  schema: {
    sound: { type: "boolean" },
  },
  init() {
    this.$controlPanel = document.querySelector("#control-panel-web");

    this.$soundButton = this.$controlPanel.querySelector(
      "#sound-button"
    ) as Entity;

    this.$recallButton = this.$controlPanel.querySelector(
      "#recall-button"
    ) as Entity;

    this.$controlPanel.classList.remove("control-panel-web--hidden");
  },
};

AFRAME.registerComponent("control-panel-web", ControlPanelWeb);
