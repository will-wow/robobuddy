import { DetailEvent, Entity } from "aframe";

import { RaycasterComponent } from "./raycaster";
import { CompDefinition } from "./type";

interface LaserZoneState {
  intersectingRaycaster?: RaycasterComponent | null;
}

interface LaserZoneData {
  pointing: boolean;
  laser: Entity;
}

export const LaserZoneComponent: CompDefinition<
  LaserZoneData,
  LaserZoneState
> = {
  schema: {
    pointing: { type: "boolean", default: false },
    laser: { type: "selector" },
  },

  events: {
    "raycaster-intersected"(event: DetailEvent<{ el: Entity }>) {
      this.intersectingRaycaster = event.detail.el.components
        .raycaster as RaycasterComponent;

      if (this.data.pointing) {
        this.data.laser.setAttribute("visible", true);
      }
    },

    "raycaster-intersected-cleared"() {
      this.intersectingRaycaster = null;
      this.data.laser.setAttribute("visible", false);
    },
  },

  tick() {
    if (!this.data.pointing || !this.intersectingRaycaster) {
      return;
    }
    const intersectionIndex = this.intersectingRaycaster.intersectedEls.indexOf(
      this.el
    );
    const intersection = this.intersectingRaycaster.intersections[
      intersectionIndex
    ];

    const point = intersection.point;
    this.data.laser.object3D.position.copy(point);
  },
};

AFRAME.registerComponent("laser-zone", LaserZoneComponent);
