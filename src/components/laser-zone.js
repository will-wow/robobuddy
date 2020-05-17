AFRAME.registerComponent("laser-zone", {
  schema: {
    pointing: { type: "boolean", default: "false" },
    laser: { type: "selector" },
  },
  events: {
    "raycaster-intersected"(event) {
      this.intersectingRaycaster = event.detail.el.components.raycaster;

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
});
