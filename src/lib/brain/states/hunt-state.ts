import { Vector3 } from "three";

import { BaseState } from "./base-state";
import {
  canSeeLaser,
  closeToPoint,
  moveToward,
  startMotorSound,
  stopMotorSound,
  faceToward,
} from "../helpers";
import { State } from "../machine";

const HUNT_SPEED = 1;

export class HuntState extends BaseState {
  targetPosition = new Vector3();

  enter() {
    faceToward(this.context, this.laserPosition());

    startMotorSound(this.context);
  }

  exit() {
    stopMotorSound(this.context);
  }

  tick(timestamp: number, delta: number) {
    if (!canSeeLaser(this.context)) {
      this.setState(State.search, timestamp);
    } else if (
      closeToPoint(this.context, this.context.laser.object3D.position)
    ) {
      this.setState(State.admire, timestamp);
    } else {
      this.moveTowardLaser(delta);
    }
  }

  /** Get the world position of the laser target, with 0.1 to match the robot height. */
  private laserPosition(): Vector3 {
    return this.context.laser.object3D.position;
  }

  private moveTowardLaser(delta: number) {
    // Move towards laser
    moveToward(this.context, this.laserPosition(), HUNT_SPEED, delta);
  }
}
