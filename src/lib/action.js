export function emit(name, payload) {
  const scene = AFRAME.scenes[0];
  scene.emit(name, payload);
}
