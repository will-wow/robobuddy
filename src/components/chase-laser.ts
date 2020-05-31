import * as THREE from "three";
import { Entity } from "aframe";

import { CompDefinition } from "./type";
import { SoundComponent } from "./sound";

interface ChaseLaserState {
  found: boolean;
  head: Entity;

  targetPosition: THREE.Vector3;
  targetHeading: THREE.Vector3;
  headDirection: THREE.Vector3;
  wanderPoint: THREE.Vector3;
  moving: boolean;

  timeToHunt: number | null;
  timeToLook: number | null;
  timeToWander: number | null;
  hasWanderPoint: boolean;
}

interface ChaseLaserData {
  laser: Entity;
}

interface ChaseLaserMethods {
  canSeeLaser: () => boolean;
  search: (timestamp: number, delta: number) => void;
  closeToPoint: (position: THREE.Vector3) => boolean;
  admire: () => void;
  hunt: (timestamp: number, delta: number) => void;
  lookAtLaser: () => void;
  handleNotMoving: () => void;
  moveTowardLaser: (delta: number) => void;
  handleMoving: () => void;
  searchMove: (delta: number) => void;
  searchHead: (delta: number) => void;
  moveToward: (position: THREE.Vector3, speed: number, delta: number) => void;
  setRandomWanderPointAlongGaze: () => void;
  setRandomWanderPoint: () => void;
}

const SEARCH_SPEED = 0.5;
const HUNT_SPEED = 1;

const FORWARD_EULER = new THREE.Euler();

const ChaseLaser: CompDefinition<
  ChaseLaserData,
  ChaseLaserState,
  ChaseLaserMethods
> = {
  schema: {
    laser: { type: "selector" },
  },
  init() {
    this.found = false;
    this.head = this.el.querySelector("#robot-head") as Entity;

    this.targetPosition = new THREE.Vector3();
    this.targetHeading = new THREE.Vector3();
    this.headDirection = new THREE.Vector3();
    this.wanderPoint = new THREE.Vector3();
    this.moving = false;

    /** Timestamp to start moving */
    this.timeToHunt = null;

    /** Timestamp to start looking around */
    this.timeToLook = null;

    /** Timestamp to start moving & searching */
    this.timeToWander = null;

    /** Is there a current search point */
    this.hasWanderPoint = false;
  },
  tick(timestamp, delta) {
    if (!this.canSeeLaser()) {
      this.found = false;
      this.timeToHunt = null;

      // If it can't see the laser, search for it.
      this.search(timestamp, delta);
    } else if (this.closeToPoint(this.data.laser.object3D.position)) {
      if (!this.found) {
        this.el.emit("happy");
        this.found = true;
      }

      this.timeToHunt = null;
      this.timeToLook = null;
      this.timeToWander = null;
      this.hasWanderPoint = false;

      // If it found the laser, stop and look at it.
      this.admire();
    } else {
      this.found = false;

      this.timeToLook = null;
      this.timeToWander = null;
      this.hasWanderPoint = false;

      // Otherwise, stalk the laser.
      this.hunt(timestamp, delta);
    }
  },
  admire() {
    this.lookAtLaser();

    this.handleNotMoving();
  },
  hunt(timestamp, delta) {
    if (!this.timeToHunt) {
      // Record when robot will start moving toward the dot.
      this.timeToHunt = timestamp + random(1000, 2000);

      this.handleNotMoving();
    } else if (this.timeToHunt < timestamp) {
      // If it's been long enough, start moving towards the laser.
      this.moveTowardLaser(delta);

      this.handleMoving();
    } else {
      this.handleNotMoving();
    }

    this.lookAtLaser();
  },
  search(timestamp, delta) {
    if (!this.timeToLook) {
      // Initialize times.
      this.timeToLook = timestamp + random(500, 1000);
      this.timeToWander = timestamp + random(3000, 6000);
      this.hasWanderPoint = false;
      this.handleNotMoving();
    } else if (this.timeToWander && this.timeToWander < timestamp) {
      // Wander
      this.searchMove(delta);
      this.handleMoving();
    } else if (this.timeToLook < timestamp) {
      // Look around
      this.searchHead(delta);
      this.handleNotMoving();
    }
  },
  canSeeLaser() {
    if (!this.data.laser.getAttribute("visible")) return false;

    // Calculate heading to target
    this.targetHeading
      .copy(this.data.laser.object3D.position)
      .sub(this.el.object3D.position)
      .normalize();

    // Normalize head direction
    this.head.object3D.getWorldDirection(this.headDirection).normalize();

    // Get the angle between the sight line and the heading.
    const dot = this.headDirection.dot(this.targetHeading);

    // 1 is 0 degrees, 0 is 90 degrees.
    return dot > 0.6;
  },

  searchMove(delta) {
    if (!this.hasWanderPoint) {
      // If no search point, pick one where the head is looking.
      this.setRandomWanderPointAlongGaze();
      this.hasWanderPoint = true;

      this.el.emit("sad");
    } else if (this.closeToPoint(this.wanderPoint)) {
      // If point is reached, pick a new one.
      this.setRandomWanderPoint();
    } else {
      // Move toward point
      this.moveToward(this.wanderPoint, SEARCH_SPEED, delta);

      // Look Forward
      this.head.object3D.rotation.copy(FORWARD_EULER);
    }
  },
  searchHead(delta) {
    const { y } = this.head.object3D.rotation;

    this.head.object3D.rotation.set(0, y + (Math.PI / 2) * (delta / 1000), 0);
  },
  lookAtLaser() {
    this.head.object3D.lookAt(this.data.laser.object3D.position);
  },
  moveTowardLaser(delta) {
    // Get the world position of the laser target, with 0.1 to match the robot height.
    this.targetPosition.copy(this.data.laser.object3D.position).setY(0.1);

    // Move towards laser
    this.moveToward(this.targetPosition, HUNT_SPEED, delta);
  },
  moveToward(position, speed, delta) {
    this.el.object3D.lookAt(position);

    // Move forward
    this.el.object3D.translateZ(speed * (delta / 1000));
  },
  closeToPoint(position) {
    return this.el.object3D.position.distanceTo(position) < 1;
  },
  setRandomWanderPointAlongGaze() {
    // Get normalized head direction
    this.head.object3D
      .getWorldDirection(this.headDirection)
      .setX(0)
      .normalize();

    // Send point out in direction of head.
    this.wanderPoint
      .copy(this.el.object3D.position)
      .addScaledVector(this.headDirection, random(1, 3));
  },
  setRandomWanderPoint() {
    this.wanderPoint.set(random(-5, 5), 0.1, random(-5, 5));
  },
  handleMoving() {
    if (this.moving) return;
    this.moving = true;

    const motorSound = this.el.components["sound__motor"] as SoundComponent;
    motorSound.playSound();
  },
  handleNotMoving() {
    if (!this.moving) return;
    this.moving = false;

    const motorSound = this.el.components["sound__motor"] as SoundComponent;
    motorSound.stopSound();
  },
};

function random(min: number, max: number) {
  return Math.floor(min + Math.random() * (max - min));
}

AFRAME.registerComponent("chase-laser", ChaseLaser);
