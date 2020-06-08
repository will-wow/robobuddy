import * as THREE from "three";

import { emit } from "lib/action";

import { CompDefinition } from "./type";

interface ControlPanelVrState {
  left: THREE.Vector3;
}

interface ControlPanelVrData {
  uiShown: boolean;
}

interface ControlPanelVrMethods {
  isUpsideDown: () => boolean;
}

const ControlPanelVr: CompDefinition<
  ControlPanelVrData,
  ControlPanelVrState,
  ControlPanelVrMethods
> = {
  schema: { uiShown: { type: "boolean" } },
  dependencies: ["hand-controls"],
  init() {
    this.left = new THREE.Vector3(1, 0, 0);
  },
  tick() {
    const isUpsideDown = this.isUpsideDown();

    if (isUpsideDown && !this.data.uiShown) {
      emit("showUi");
    } else if (!isUpsideDown && this.data.uiShown) {
      emit("hideUi");
    }
  },
  isUpsideDown() {
    const { rotation } = this.el.object3D;

    // Point the vector left
    this.left.set(1, 0, 0);
    // Apply the rotation of the hand
    this.left.applyEuler(rotation);

    // Vector should now be pointing up.
    const { y } = this.left;
    return y > 0.9;
  },
};

AFRAME.registerComponent("control-panel-vr", ControlPanelVr);
