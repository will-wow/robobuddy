import { emit } from "../lib/action";

/**
 * Trigger an action from an event
 */
AFRAME.registerComponent("trigger-action", {
  multiple: true,
  schema: {
    document: { type: "boolean", default: false },
    action: { type: "string" },
    event: { type: "string" },
  },

  init() {
    const { action, event } = this.data;

    const el = this.data.document ? document : this.el;

    const eventName = event || this.id || "click";

    el.addEventListener(eventName, (_e) => {
      emit(action);
    });
  },
});
