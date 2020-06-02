import { BaseState } from "./base-state";
import { canSeeLaser, random } from "../helpers";
import { State } from "../machine";

export class SearchState extends BaseState {
  timeToLook = 0;
  timeToWander = 0;

  enter(timestamp: number) {
    this.timeToLook = timestamp + random(500, 1000);
    this.timeToWander = timestamp + random(3000, 6000);
  }

  tick(timestamp: number, delta: number) {
    if (canSeeLaser(this.context)) {
      // If the bot can see the laser, focus on it.
      this.setState(State.focus, timestamp);
    } else if (timestamp >= this.timeToWander) {
      // If it's time to wander, switch to wander mode.
      this.setState(State.wander, timestamp);
    } else if (timestamp >= this.timeToLook) {
      // If it's time to look around, do that.
      this.searchHead(delta);
    }
  }

  searchHead(delta: number) {
    const { y } = this.context.head.object3D.rotation;

    this.context.head.object3D.rotation.set(
      0,
      y + (Math.PI / 2) * (delta / 1000),
      0
    );
  }
}
