import React from "react";
import { Entity } from "aframe-react";

import { renderData } from "lib/entity";

interface VrButtonProps {
  isActive?: boolean;
  children: string;
  color: string;
  inactiveColor?: string;
  onClick: () => void;
}

const VrButton: React.FunctionComponent<VrButtonProps> = ({
  isActive = true,
  children,
  color,
  inactiveColor,
  onClick,
}) => {
  return (
    <Entity
      class="action-button"
      mixin="flat-button"
      trigger-action__click="action: <%= @action %>"
      color-switch={renderData({
        on: isActive,
        onColor: color,
        offColor: inactiveColor || color,
      })}
    >
      <Entity
        mixin="button-text"
        text={renderData({ value: children })}
      ></Entity>

      <Entity
        class="touch-button"
        mixin="touch-target"
        data-aabb-collider-dynamic="true"
        events={{
          hitclosest: onClick,
        }}
      ></Entity>
    </Entity>
  );
};

export default VrButton;
