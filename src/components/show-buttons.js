AFRAME.registerComponent("show-buttons", {
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
});
