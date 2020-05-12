const speed = 0.5;
const maxRotation = 0.5;

AFRAME.registerComponent("chase-laser", {
  schema: {
    laser: { type: "selector" },
  },
  init() {
    this.found = false;
    this.head = this.el.querySelector("#robot-head");
    this.target = this.data.laser.querySelector("#laser-target");

    this.targetPosition = new THREE.Vector3();
    this.targetHeading = new THREE.Vector3();
    this.headDirection = new THREE.Vector3();
  },
  events: {
    hitclosest() {
      this.found = true;
    },
    hitclosestclear() {
      this.found = false;
    },
  },
  tick(timestamp, delta) {
    if (this.found) return;
    if (!this.data.laser.getAttribute("visible")) return;

    // Get the world position of the laser target
    // (which is the same height as the robot)

    if (this.canSeeLaser()) {
      this.target.object3D.getWorldPosition(this.targetPosition);

      this.lookAtLaser();
      this.moveTowardLaser(delta);
    }
  },
  canSeeLaser() {
    // Calculate heading to target
    this.targetHeading
      .copy(this.data.laser.object3D.position)
      .sub(this.el.object3D.position)
      .normalize();

    // Normalize head direction
    this.head.object3D.getWorldDirection(this.headDirection).normalize();

    // Get the angle between the sight line and the heading.
    const dot = this.headDirection.dot(this.targetHeading);

    return dot > 0.6;
  },
  lookAtLaser() {
    this.el.object3D.lookAt(this.targetPosition);
  },
  moveTowardLaser(delta) {
    this.el.object3D.translateZ(speed * (delta / 1000));
    this.head.object3D.lookAt(this.targetPosition);
  },
});
