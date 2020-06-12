import { BaseState } from "./base-state";
import { lookAtLaser, canSeeLaser, closeToPoint } from "../helpers";
import { State } from "../machine";

export class AdmireState extends BaseState {
  enter() {
    this.context.el.emit("happy");
  }

  tick(timestamp: number) {
    if (!canSeeLaser(this.context)) {
      this.setState(State.search, timestamp);
    } else if (
      !closeToPoint(this.context, this.context.laser.object3D.position)
    ) {
      this.setState(State.focus, timestamp);
    } else {
      lookAtLaser(this.context);
    }
  }

  recall(timestamp: number) {}
}
