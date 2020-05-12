export const ACTIONS = {
  controllerConnectedRight: "controllerConnectedRight",
  controllerConnectedLeft: "controllerConnectedLeft",
  showUi: "showUi",
  hideUi: "hideUi",
};

AFRAME.registerState({
  initialState: {
    controller: {
      left: false,
      right: false,
    },
    uiShown: false,
  },
  handlers: {
    [ACTIONS.controllerConnectedRight](state) {
      state.controller.right = true;
    },
    [ACTIONS.controllerConnectedLeft](state) {
      state.controller.left = true;
    },
    [ACTIONS.showUi](state) {
      state.uiShown = true;
    },
    [ACTIONS.hideUi](state) {
      state.uiShown = false;
    },
  },
});

// TODO: make this a method once computeState is fixed https://github.com/supermedium/superframe/issues/240
function computeState(state, _payload) {
  // Calculate user laser color.
  state.userLaserColor =
    !state.play && state.pointing ? LASER_COLOR.red : LASER_COLOR.blue;

  // Show speaker laser.
  state.speakerLaser = (state.play || state.record) && state.pointing;
}
