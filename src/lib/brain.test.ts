import { chaseMachine, ChaseMachine, ChaseState } from "./brain";

describe("chaseMachine", () => {
  let machine: ChaseMachine;
  let state: ChaseState;

  beforeEach(() => {
    machine = chaseMachine({});
    state = machine.initialState;
  });

  it("transitions to hunt when found", () => {
    const newState = machine.transition(state, "FOUND");
    expect(newState.matches("hunt")).toBe(true);
  });
});
