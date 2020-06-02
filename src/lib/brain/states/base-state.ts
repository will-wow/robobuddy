import { BrainContext } from "../brain-context";
import { State } from "../machine";

export class BaseState {
  constructor(
    public context: BrainContext,
    public setState: (state: State, timestamp: number) => void
  ) {}

  enter(timestamp: number) {}

  exit(timestamp: number) {}

  tick(timestamp: number, delta: number) {}
}
