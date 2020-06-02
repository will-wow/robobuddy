import { Entity } from "aframe";
import { Vector3 } from "three";

export interface BrainContextParams {
  el: Entity;
  head: Entity;
  laser: Entity;
}

export interface BrainContext extends BrainContextParams {
  targetHeading: Vector3;
  headDirection: Vector3;
}

export const makeContext = ({
  el,
  head,
  laser,
}: BrainContextParams): BrainContext => {
  const targetHeading = new Vector3();
  const headDirection = new Vector3();

  return {
    el,
    head,
    laser,
    targetHeading,
    headDirection,
  };
};
