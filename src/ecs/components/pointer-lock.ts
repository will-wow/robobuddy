import { CompDefinition } from "./type";
import { Entity } from "aframe";

interface PointerLockState {
  pointerLocked: boolean;
}

interface PointerLockData {
  play: boolean;
  vr: boolean;
}

interface PointerLockMethods {
  lockPointer(): void;
  onPointerLockChange(): void;
  onPointerLockError(e: any): void;
  exitPointerLock(): void;
  enterVr(): void;
  exitVr(): void;
}

const PointerLock: CompDefinition<
  PointerLockData,
  PointerLockState,
  PointerLockMethods
> = {
  schema: {
    play: { type: "boolean" },
    vr: { type: "boolean" },
  },
  dependencies: ["look-controls"],
  init() {
    const scene = this.el.sceneEl as Entity;

    this.pointerLocked = false;

    this.onPointerLockChange = this.onPointerLockChange.bind(this);
    this.onPointerLockError = this.onPointerLockError.bind(this);
    this.exitPointerLock = this.exitPointerLock.bind(this);
    this.lockPointer = this.lockPointer.bind(this);
    this.enterVr = this.enterVr.bind(this);
    this.exitVr = this.exitVr.bind(this);

    document.addEventListener("pointerlockchange", this.onPointerLockChange);
    document.addEventListener("pointerlockerror", this.onPointerLockError);

    scene.addEventListener("enter-vr", this.enterVr);
    scene.addEventListener("exit-vr", this.exitVr);

    scene.addEventListener("loaded", () => {
      setTimeout(() => {
        scene.pause();
      });
    });
  },
  update() {
    if (this.data.vr) return;

    if (this.data.play && !this.pointerLocked) {
      this.lockPointer();
    } else if (!this.data.play && this.pointerLocked) {
      this.exitPointerLock();
    }
  },
  lockPointer() {
    const canvasEl = this.el.sceneEl?.canvas;
    if (!canvasEl) return;

    canvasEl.requestPointerLock();
  },
  exitPointerLock() {
    document.exitPointerLock();
  },
  onPointerLockChange() {
    const pointerLocked = !!document.pointerLockElement;

    if (this.data.vr) return;
    if (this.pointerLocked === pointerLocked) return;

    this.pointerLocked = pointerLocked;

    if (this.pointerLocked) {
      this.el.emit("close-ui");
      this.el.sceneEl?.play();
    } else {
      this.el.emit("open-ui");
      this.el.sceneEl?.pause();
    }
  },
  /** Recover from Pointer Lock error. */
  onPointerLockError(e) {
    console.error("pointer lock error", e);
    this.pointerLocked = false;
  },
  enterVr() {
    this.el.emit("close-ui");
    this.el.sceneEl?.play();
  },
  exitVr() {
    this.el.emit("open-ui");
    this.el.sceneEl?.pause();
  },
};

AFRAME.registerComponent("pointer-lock", PointerLock);
