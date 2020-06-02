import { BaseState } from "./base-state";
import {
  canSeeLaser,
  closeToPoint,
  random,
  lookAtLaser,
} from "../helpers";
import { State } from "../machine";

export class FocusState extends BaseState {
  timeToHunt = 0;

  enter(timestamp: number) {
    this.timeToHunt = timestamp + random(1000, 2000);
  }

  tick(timestamp: number, delta: number) {
    if (!canSeeLaser(this.context)) {
      this.setState(State.search, timestamp);
    } else if (
      closeToPoint(this.context, this.context.laser.object3D.position)
    ) {
      this.setState(State.admire, timestamp);
    } else if (timestamp > this.timeToHunt) {
      this.setState(State.hunt, timestamp);
    } else {
      lookAtLaser(this.context);
    }
  }
}
