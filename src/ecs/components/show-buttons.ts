
import { CompDefinition } from "./type";

export const ShowButtonsComponent: CompDefinition<any> = {
  schema: { type: "boolean", default: true },
  update(oldData) {
    const visible = this.data;
    if (oldData === visible) return;

    this.el.object3D.visible = visible;

    this.el.querySelectorAll(".action-button").forEach((button) => {
      if (visible) {
        button.classList.remove("hidden");
      } else {
        button.classList.add("hidden");
      }
    });
  },
};

AFRAME.registerComponent("show-buttons", ShowButtonsComponent);
