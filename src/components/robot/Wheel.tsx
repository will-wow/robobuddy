import React from "react";

interface WheelProps {
  side: "left" | "right";
  direction: "front" | "back";
}

const WHEEL_X = 0.1;
const WHEEL_Z = 0.125;

const Wheel: React.FunctionComponent<WheelProps> = ({ side, direction }) => {
  const id = `wheel-${side}-${direction}`;

  const xPosition = side === "right" ? WHEEL_X : -WHEEL_X;
  const zPosition = direction === "front" ? WHEEL_Z : -WHEEL_Z;

  const position = `${xPosition} 0 ${zPosition}`;
  const rotation = "0 0 -90";

  return (
    <a-entity
      id={id}
      geometry="primitive: cylinder; height: 0.1; radius: 0.1"
      material="color: black"
      position={position}
      rotation={rotation}
    ></a-entity>
  );
};

export default React.memo(Wheel);
