import { CompDefinition } from "./type";

import { emit } from "../lib/action";

interface TriggerActionData {
  document: boolean;
  action: string;
  event: string;
}

/**
 * Trigger an action from an event
 */
export const TriggerActionComponent: CompDefinition<TriggerActionData> = {
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
};

AFRAME.registerComponent("trigger-action", TriggerActionComponent);
