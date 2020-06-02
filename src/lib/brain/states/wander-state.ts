import * as THREE from "three";

import { BaseState } from "./base-state";
import {
  canSeeLaser,
  random,
  closeToPoint,
  moveToward,
  startMotorSound,
  stopMotorSound,
  faceToward,
} from "../helpers";
import { State } from "../machine";

const SEARCH_SPEED = 0.5;
const FORWARD_EULER = new THREE.Euler();

export class WanderState extends BaseState {
  wanderPoint = new THREE.Vector3();

  enter(_timestamp: number) {
    this.setRandomWanderPointAlongGaze();
    this.context.el.emit("sad");
    startMotorSound(this.context);
  }

  exit() {
    stopMotorSound(this.context);
  }

  tick(timestamp: number, delta: number) {
    if (canSeeLaser(this.context)) {
      // If the bot can see the laser, focus on it.
      this.setState(State.focus, timestamp);
    } else if (closeToPoint(this.context, this.wanderPoint)) {
      // If made it to the wander point, pick a new one.
      this.setRandomWanderPoint();
    } else {
      // Move toward point.
      moveToward(this.context, this.wanderPoint, SEARCH_SPEED, delta);
    }
  }

  private setRandomWanderPointAlongGaze() {
    // Get normalized head direction
    this.context.head.object3D
      .getWorldDirection(this.context.headDirection)
      .setX(0)
      .normalize();

    // Send point out in direction of head.
    this.wanderPoint
      .copy(this.context.el.object3D.position)
      .addScaledVector(this.context.headDirection, random(1, 3));

    faceToward(this.context, this.wanderPoint);
  }

  private setRandomWanderPoint() {
    this.wanderPoint.set(random(-5, 5), 0.1, random(-5, 5));

    faceToward(this.context, this.wanderPoint);
  }
}
