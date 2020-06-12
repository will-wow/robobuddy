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
      geometry="primitive: box; height: 0.1; width: 0.2; depth: 0.01"
      material="transparent: true; opacity: 0.3"
      color-switch={{
        component: "material",
        on: isActive,
        onColor: color,
        offColor: inactiveColor || color,
      }}
      events={{
        click: onClick,
      }}
    >
      <Entity
        className="action-button__text"
        text={{
          color: "#dfe2f2",
          align: "center",
          value: children,
        }}
      ></Entity>

      <Entity
        class="touch-button"
        geometry="primitive: box; height: 0.01; width: 0.01; depth: 0.009"
        material="transparent: true; opacity: 0"
        data-aabb-collider-dynamic="true"
        events={{
          hitclosest: onClick,
        }}
      ></Entity>
    </Entity>
  );
};

export default VrButton;
