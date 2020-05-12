import { emit } from "../lib/action";

/**
 * Trigger a an action from an event
 */
AFRAME.registerComponent("trigger-action", {
  multiple: true,
  schema: {
    action: { type: "string" },
    event: { type: "string" },
  },

  init() {
    const { action, event } = this.data;
    const el = this.el;

    const eventName = event || this.id || "click";

    el.addEventListener(eventName, (_e) => {
      emit(action);
    });
  },
});
