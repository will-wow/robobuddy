import { produce } from "immer";

export enum ACTIONS {
  controllerConnectedRight = "controllerConnectedRight",
  controllerConnectedLeft = "controllerConnectedLeft",
  showUi = "showUi",
  hideUi = "hideUi",
  pointStart = "pointStart",
  pointEnd = "pointEnd",
  play = "play",
  sound = "sound",
  loaded = "loaded",
}

export type AppAction =
  | { type: ACTIONS.controllerConnectedRight }
  | { type: ACTIONS.controllerConnectedLeft }
  | { type: ACTIONS.showUi }
  | { type: ACTIONS.hideUi }
  | { type: ACTIONS.pointStart }
  | { type: ACTIONS.pointEnd }
  | { type: ACTIONS.play; data: boolean }
  | { type: ACTIONS.sound; data: boolean }
  | { type: ACTIONS.loaded };

export interface AppState {
  pointing: boolean;
  controller: {
    left: boolean;
    right: boolean;
  };
  uiShown: boolean;
  loaded: boolean;
  sound: boolean;
  play: boolean;
}

export const initialState: AppState = {
  pointing: false,
  controller: {
    left: false,
    right: false,
  },
  uiShown: false,
  loaded: false,
  sound: false,
  play: false,
};

export const reducer = produce((state: AppState, action: AppAction) => {
  switch (action.type) {
    case ACTIONS.pointStart: {
      state.pointing = true;
      break;
    }
    case ACTIONS.pointEnd: {
      state.pointing = false;
      break;
    }
    case ACTIONS.controllerConnectedRight: {
      state.controller.right = true;
      break;
    }
    case ACTIONS.controllerConnectedLeft: {
      state.controller.left = true;
      break;
    }
    case ACTIONS.showUi: {
      state.uiShown = true;
      break;
    }
    case ACTIONS.hideUi: {
      state.uiShown = false;
      break;
    }
    case ACTIONS.sound: {
      state.sound = action.data;
      break;
    }
    case ACTIONS.play: {
      state.play = action.data;
      break;
    }
    case ACTIONS.loaded: {
      state.loaded = true;
      break;
    }
    default: {
      break;
    }
  }
});
