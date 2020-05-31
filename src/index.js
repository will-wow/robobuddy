function requireAll(req) {
  req.keys().forEach(req);
}

// Require all components.
requireAll(require.context("./components/", true, /\.(js|ts)$/));

import "aframe-extras";
import "aframe-aabb-collider-component";
import "aframe-environment-component";
import "aframe-state-component";
import "aframe-layout-component";

import "./store/state.js";
import "./scene.html";
