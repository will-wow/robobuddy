declare global {
  namespace AFRAME {
    function registerState(opts: any): void;
  }
}

export const ACTIONS = {
  controllerConnectedRight: "controllerConnectedRight",
  controllerConnectedLeft: "controllerConnectedLeft",
  showUi: "showUi",
  hideUi: "hideUi",
  pointStart: "pointStart",
  pointEnd: "pointEnd",
};

AFRAME.registerState({
  initialState: {
    pointing: false,
    controller: {
      left: false,
      right: false,
    },
    uiShown: false,
  },
  handlers: {
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
  },
});
