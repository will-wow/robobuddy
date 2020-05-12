AFRAME.registerComponent("laser-zone", {
  schema: {
    laser: { type: "selector" },
  },
  init() {
    this.pointing = false;

    document.addEventListener("mousedown", () => {
      this.pointing = !this.pointing;
      this.data.laser.setAttribute("visible", this.pointing);
    });
  },
  events: {
    "raycaster-intersected"(event) {
      this.intersectingRaycaster = event.detail.el.components.raycaster;

      if (this.pointing) {
        this.data.laser.setAttribute("visible", true);
      }
    },

    "raycaster-intersected-cleared"() {
      this.intersectingRaycaster = null;
      this.data.laser.setAttribute("visible", false);
    },
  },

  tick() {
    if (!this.pointing || !this.intersectingRaycaster) {
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

  setPointing(pointing) {
    this.pointing = pointing;
    this.data.laser.setAttribute("visible", this.pointing);
  },
});
