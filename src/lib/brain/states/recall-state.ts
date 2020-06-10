import { Vector3 } from "three";
import { BaseState } from "./base-state";

import {
  canSeeLaser,
  moveToward,
  closeToPoint,
  positionToPlane,
  getPlayerPosition,
} from "../helpers";
import { State } from "../machine";

const MOVE_SPEED = 0.5;

export class RecallState extends BaseState {
  playerPosition = new Vector3();

  enter() {
    this.context.el.emit("happy");
  }

  tick(timestamp: number, delta: number) {
    this.playerPosition = getPlayerPosition(this.context);

    if (canSeeLaser(this.context)) {
      this.setState(State.focus, timestamp);
    } else if (this.isAtPlayer()) {
      this.setState(State.pet, timestamp);
    } else {
      this.moveTowardPlayer(delta);
    }
  }

  moveTowardPlayer(delta: number) {
    this.context.head.object3D.lookAt(this.playerPosition);

    moveToward(this.context, this.playerPosition, MOVE_SPEED, delta);
  }

  isAtPlayer() {
    const playerFeet = positionToPlane(this.context, this.playerPosition);

    return closeToPoint(this.context, playerFeet, 0.5);
  }

  recall(timestamp: number) {}
}
