import { BaseState } from "./states/base-state";
import { AdmireState } from "./states/admire-state";
import { HuntState } from "./states/hunt-state";
import { BrainContext } from "./brain-context";
import { SearchState } from "./states/search-state";
import { FocusState } from "./states/focus-state";
import { WanderState } from "./states/wander-state";
import { RecallState } from "./states/recall-state";
import { PetState } from "./states/pet-state";

export enum State {
  search = "search",
  wander = "wander",
  focus = "focus",
  hunt = "hunt",
  admire = "admire",
  recall = "recall",
  pet = "pet",
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
      [State.recall]: new RecallState(context, this.setState),
      [State.pet]: new PetState(context, this.setState),
    };

    // Initialize state.
    this.stateName = State.search;
    this.state = this.states[this.stateName];
    this.state.enter(this.time);
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

  recall(timestamp: number) {
    this.state.recall(timestamp);
  }
}
