import { Component } from "aframe";

export interface SoundComponent extends Component {
  intersectedEls: any[];
  playSound: () => void;
  stopSound: () => void;
}
