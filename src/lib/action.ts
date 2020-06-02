export function emit(name: string, payload?: any) {
  const scene = AFRAME.scenes[0];
  scene.emit(name, payload);
}
