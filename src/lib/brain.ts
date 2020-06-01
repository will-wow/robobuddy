import { Machine, assign, Interpreter, StateMachine, State } from "xstate";
import { Entity } from "aframe";
import * as THREE from "three";
import { SoundComponent } from "src/components/sound";

interface ChaseSchema {
  states: {
    search: {
      states: {
        look: {};
        move: {};
      };
    };
    hunt: {};
    admire: {};
  };
}

interface ChaseEventTick {
  type: "TICK";
  value: number;
}
interface ChaseEventFound {
  type: "FOUND";
}
interface ChaseEventNotFound {
  type: "NOT_FOUND";
}
interface ChaseEventCaught {
  type: "CAUGHT";
}

// The events that the machine handles
type ChaseEvent =
  | ChaseEventTick
  | ChaseEventFound
  | ChaseEventNotFound
  | ChaseEventCaught;

/**  The context (extended state) of the machine. */
interface ChaseContext {
  timestamp: number;
  el: Entity | null;
  wanderPoint: THREE.Vector3 | null;
  timeToWander: number | null;
  timeToHunt: number | null;
  timeToLook: number | null;
}

export type ChaseBrain = Interpreter<ChaseContext, ChaseSchema, ChaseEvent>;

export type ChaseMachine = StateMachine<ChaseContext, ChaseSchema, ChaseEvent>;

export type ChaseState = State<ChaseContext, ChaseEvent, ChaseSchema>;

// Actions
const happySound = (context: ChaseContext) => {
  context.el?.emit("happy");
};

const startMotorSound = (context: ChaseContext) => {
  const motorSound = context.el?.components["sound__motor"] as SoundComponent;
  motorSound?.playSound();
};

const stopMotorSound = (context: ChaseContext) => {
  const motorSound = context.el?.components["sound__motor"] as SoundComponent;
  motorSound?.stopSound();
};

// Assign actions

const updateTimestamp = assign<ChaseContext, ChaseEventTick>({
  timestamp: (_context, event) => event.value,
});

const scheduleHunt = assign<ChaseContext>({
  timeToHunt: (context) => context.timestamp + random(1000, 2000),
});

const searchTick = assign<ChaseContext, ChaseEventTick>({
  timestamp: (_context, event) => event.value,
});

const clearState = assign<ChaseContext>({
  wanderPoint: null,
  timeToWander: null,
  timeToHunt: null,
  timeToLook: null,
});

/** State Machine for the chase-laser component  */
export const chaseMachine = (context: Partial<ChaseContext>) => {
  const targetPosition = new THREE.Vector3();
  const targetHeading = new THREE.Vector3();
  const headDirection = new THREE.Vector3();
  const wanderPoint = new THREE.Vector3();

  const initialContext: ChaseContext = {
    timestamp: -1,
    el: null as Entity | null,
    wanderPoint: null,
    timeToWander: null,
    timeToHunt: null,
    timeToLook: null,
    ...context,
  };

  return Machine<ChaseContext, ChaseSchema, ChaseEvent>({
    key: "chase",
    initial: "search",
    context: { ...initialContext, ...context },
    on: {
      FOUND: "hunt",
      CAUGHT: "admire",
      TICK: {
        actions: [updateTimestamp],
      },
    },
    states: {
      search: {
        key: "search",
        initial: "look",
        states: {
          look: {
            on: {
              NOT_FOUND: "move",
              TICK: {
                actions: [updateTimestamp],
              },
            },
          },
          move: {
            entry: [startMotorSound],
            exit: [stopMotorSound],
            on: {
              NOT_FOUND: "move",
            },
          },
        },
      },
      hunt: {
        entry: [scheduleHunt, startMotorSound],
        exit: [stopMotorSound],
        on: {
          CAUGHT: "admire",
          NOT_FOUND: "search",
        },
      },
      admire: {
        entry: [clearState, happySound],
        on: {
          NOT_FOUND: "search",
        },
      },
    },
  });
};

function random(min: number, max: number) {
  return Math.floor(min + Math.random() * (max - min));
}
