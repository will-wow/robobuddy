import { BaseState } from "./base-state";
import { canSeeLaser, random, getPlayerPosition } from "../helpers";
import { State } from "../machine";

/** Accept pets. */
export class PetState extends BaseState {
  /** When it will leave after pets stop. */
  timeToGiveUp: number = 0;
  /** When it will leave no matter what. */
  timeToIgnore: number = 0;

  enter(timestamp: number) {
    this.context.el.emit("happy");

    this.timeToIgnore = timestamp + random(5000, 15000);
    this.resetTimeToGiveUp(timestamp);
  }

  tick(timestamp: number, delta: number) {
    if (canSeeLaser(this.context)) {
      // Chase the laser if seen
      this.setState(State.focus, timestamp);
      this.goWander(timestamp);
    } else if (this.timeToIgnore < timestamp) {
      // Leave no matter what eventually
      this.goWander(timestamp);
    } else if (this.context.petting) {
      // Petting is happening.
      this.resetTimeToGiveUp(timestamp);
    } else if (this.timeToGiveUp < timestamp) {
      // No pets, give up.
      this.goWander(timestamp);
    } else {
      // Waiting for pets.
      this.lookAtPlayer();
    }
  }

  recall(timestamp: number) {}

  private resetTimeToGiveUp(timestamp: number) {
    this.timeToGiveUp = timestamp + 1000;
  }

  private lookAtPlayer() {
    const playerPosition = getPlayerPosition(this.context);

    this.context.head.object3D.lookAt(playerPosition);
  }

  private goWander(timestamp: number) {
    this.context.head.object3D.rotation.set(15, 0, 0);
    this.setState(State.wander, timestamp);
  }
}
