import { BaseState } from "./states/base-state";
import { AdmireState } from "./states/admire-state";
import { HuntState } from "./states/hunt-state";
import { BrainContext } from "./brain-context";
import { SearchState } from "./states/search-state";
import { FocusState } from "./states/focus-state";
import { WanderState } from "./states/wander-state";

export enum State {
  search = "search",
  wander = "wander",
  focus = "focus",
  hunt = "hunt",
  admire = "admire",
}

export class Machine {
  time = 0;
  stateName: State;

  private states: Record<State, BaseState>;
  private state: BaseState;

  constructor(context: BrainContext) {
    this.setState = this.setState.bind(this);

    this.states = {
      [State.search]: new SearchState(context, this.setState),
      [State.wander]: new WanderState(context, this.setState),
      [State.focus]: new FocusState(context, this.setState),
      [State.hunt]: new HuntState(context, this.setState),
      [State.admire]: new AdmireState(context, this.setState),
    };

    this.setState(State.search, this.time);
  }

  tick(delta: number): void {
    // Cap delta to avoid large changes from pausing.
    const cappedDelta = Math.min(delta, 1000);

    this.time += cappedDelta;

    this.state.tick(this.time, cappedDelta);
  }

  setState(state: State, timestamp: number): void {
    // Exit old state.
    this.state?.exit(timestamp);

    // Update state.
    this.stateName = state;
    this.state = this.states[this.stateName];

    // Enter new state.
    this.state.enter(timestamp);
  }
}
