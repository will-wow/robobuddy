import { produce } from "immer";

export interface AppState {
  pointing: boolean;
  controller: {
    left: boolean;
    right: boolean;
  };
  uiShown: boolean;
}

export enum ACTIONS {
  controllerConnectedRight = "controllerConnectedRight",
  controllerConnectedLeft = "controllerConnectedLeft",
  showUi = "showUi",
  hideUi = "hideUi",
  pointStart = "pointStart",
  pointEnd = "pointEnd",
}

export type AppAction =
  | { type: ACTIONS.controllerConnectedRight }
  | { type: ACTIONS.controllerConnectedLeft }
  | { type: ACTIONS.showUi }
  | { type: ACTIONS.hideUi }
  | { type: ACTIONS.pointStart }
  | { type: ACTIONS.pointEnd };

export const initialState: AppState = {
  pointing: false,
  controller: {
    left: false,
    right: false,
  },
  uiShown: false,
};

const handlers = {
  [ACTIONS.pointStart](state: any) {
    state.pointing = true;
  },
  [ACTIONS.pointEnd](state: any) {
    state.pointing = false;
  },
  [ACTIONS.controllerConnectedRight](state: any) {
    state.controller.right = true;
  },
  [ACTIONS.controllerConnectedLeft](state: any) {
    state.controller.left = true;
  },
  [ACTIONS.showUi](state: any) {
    state.uiShown = true;
  },
  [ACTIONS.hideUi](state: any) {
    state.uiShown = false;
  },
};

export const reducer = produce((state: AppState, action: AppAction) => {
  handlers[action.type](state);
});
