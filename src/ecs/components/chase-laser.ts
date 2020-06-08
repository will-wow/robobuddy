import { Entity } from "aframe";

import { makeContext } from "lib/brain/brain-context";
import { Machine, State } from "lib/brain/machine";

import { CompDefinition } from "./type";

interface ChaseLaserState {
  machine: Machine;
  head: Entity;
  light: Entity;
}

interface ChaseLaserData {
  laser: Entity;
}

const stateColor = {
  [State.search]: "green",
  [State.wander]: "aquamarine",
  [State.focus]: "orange",
  [State.hunt]: "red",
  [State.admire]: "blue",
};

const ChaseLaser: CompDefinition<ChaseLaserData, ChaseLaserState> = {
  schema: {
    laser: { type: "selector" },
  },
  init() {
    this.head = this.el.querySelector("#robot-head") as Entity;
    this.light = this.head.querySelector("#state-light") as Entity;

    this.el.setAttribute("position", "0 0.1 -3");
    this.head.setAttribute("position", "0 0.4 0.15");
    this.head.setAttribute("rotation", "15 0 0");

    const context = makeContext({
      el: this.el,
      head: this.head,
      laser: this.data.laser,
    });

    this.machine = new Machine(context);
  },
  tick(_timestamp, delta) {
    this.machine.tick(delta);

    const color = stateColor[this.machine.stateName];
    this.light.setAttribute("light", { color });
    this.light.setAttribute("material", { color });
  },
};

AFRAME.registerComponent("chase-laser", ChaseLaser);
