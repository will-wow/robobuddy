import { BaseState } from "./base-state";
import { canSeeLaser } from "../helpers";
import { State } from "../machine";

/** Accept pets. */
export class PetState extends BaseState {
  enter() {
    this.context.el.emit("happy");
  }

  tick(timestamp: number, delta: number) {
    if (canSeeLaser(this.context)) {
      this.setState(State.focus, timestamp);
    } else {
      // TODO: purr
      // TODO: randomly be done with pets
    }
  }

  recall(timestamp: number) {}
}
