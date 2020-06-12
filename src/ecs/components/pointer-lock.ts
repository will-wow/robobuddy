import { CompDefinition } from "./type";
import { Entity } from "aframe";

interface PointerLockState {
  pointerLocked: boolean;
}

interface PointerLockData {
  play: boolean;
}

interface PointerLockMethods {
  lockPointer(): void;
  onPointerLockChange(): void;
  onPointerLockError(): void;
  exitPointerLock(): void;
}

const PointerLock: CompDefinition<
  PointerLockData,
  PointerLockState,
  PointerLockMethods
> = {
  schema: { play: { type: "boolean" } },
  dependencies: ["look-controls"],
  init() {
    const scene = this.el.sceneEl as Entity;

    this.pointerLocked = false;

    this.onPointerLockChange = this.onPointerLockChange.bind(this);
    this.onPointerLockError = this.onPointerLockError.bind(this);

    document.addEventListener("pointerlockchange", this.onPointerLockChange);
    document.addEventListener("pointerlockerror", this.onPointerLockError);

    scene.addEventListener("enter-vr", this.exitPointerLock);
    scene.addEventListener("exit-vr", this.lockPointer);

    scene.addEventListener("loaded", () => {
      setTimeout(() => {
        // scene.pause();
      });
    });
  },
  update() {
    if (this.data.play && !this.pointerLocked) {
      this.lockPointer();
    } else if (!this.data.play && this.pointerLocked) {
      this.exitPointerLock();
      document.exitPointerLock();
    }
  },
  lockPointer() {
    const canvasEl = this.el.sceneEl?.canvas;
    if (!canvasEl) return;

    canvasEl.requestPointerLock();
  },
  onPointerLockChange: function () {
    this.pointerLocked = !!document.pointerLockElement;

    if (this.pointerLocked) {
      this.el.emit("pointerLocked");
      this.el.sceneEl?.play();
    } else {
      this.el.emit("pointerUnlocked");
      this.el.sceneEl?.pause();
    }
  },
  /** Recover from Pointer Lock error. */
  onPointerLockError: function () {
    this.pointerLocked = false;
  },
  /** Exits pointer-locked mode. */
  exitPointerLock: function () {
    document.exitPointerLock();
    this.pointerLocked = false;

    this.el.emit("pointerUnlocked");
    this.el.sceneEl?.pause();
  },
};

AFRAME.registerComponent("pointer-lock", PointerLock);
