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
    this.setTargetPosition();
    faceToward(this.context, this.targetPosition);

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
  private setTargetPosition() {
    this.targetPosition.copy(this.context.laser.object3D.position).setY(0.1);
  }

  private moveTowardLaser(delta: number) {
    this.setTargetPosition();

    // Move towards laser
    moveToward(this.context, this.targetPosition, HUNT_SPEED, delta);
  }
}
