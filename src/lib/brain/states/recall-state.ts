import { BaseState } from "./base-state";
import { canSeeLaser, moveToward } from "../helpers";
import { State } from "../machine";

const MOVE_SPEED = 10;

export class RecallState extends BaseState {
  enter() {
    this.context.el.emit("happy");
  }

  tick(timestamp: number, delta: number) {
    if (canSeeLaser(this.context)) {
      this.setState(State.focus, timestamp);
    } else {
      this.moveTowardPlayer(delta);
    }
  }

  moveTowardPlayer(delta: number) {
    // TODO: normalize to 0.1 y
    moveToward(
      this.context,
      this.context.player.object3D.position,
      MOVE_SPEED,
      delta
    );
  }

  recall(timestamp: number) {}
}
