import { Entity } from "aframe";
import { Vector3 } from "three";

export interface BrainContextParams {
  el: Entity;
  head: Entity;
  laser: Entity;
  player: Entity;
}

export interface BrainContext extends BrainContextParams {
  playerPosition: Vector3;
  targetPosition: Vector3;
  targetHeading: Vector3;
  headDirection: Vector3;
  petting: boolean;
}

export const makeContext = ({
  el,
  head,
  laser,
  player,
}: BrainContextParams): BrainContext => {
  const playerPosition = new Vector3();
  const targetPosition = new Vector3();
  const targetHeading = new Vector3();
  const headDirection = new Vector3();

  return {
    el,
    head,
    laser,
    player,
    playerPosition,
    targetPosition,
    targetHeading,
    headDirection,
    petting: false,
  };
};
