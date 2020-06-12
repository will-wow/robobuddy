import { BrainContext } from "../brain-context";
import { State } from "../machine";

export class BaseState {
  constructor(
    public context: BrainContext,
    public setState: (state: State, timestamp: number) => void
  ) {}

  enter(timestamp: number): void {}

  exit(timestamp: number): void {}

  tick(timestamp: number, delta: number): void {}

  recall(timestamp: number): void {
    this.setState(State.recall, timestamp);
  }
}
