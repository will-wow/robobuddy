declare namespace JSX {
  interface IntrinsicElements {
    "a-entity": any;
    "a-mixin": any;
    "a-scene": any;
    "a-assets": any;
  }
}

declare module "aframe-react" {
  import { DetailEvent } from "aframe";

  type EventHandler = (event: DetailEvent) => void;

  interface EntityProps {
    id?: string | number;
    className?: string;
    children?: React.ReactNode;
    events?: Record<string, EventHandler | EventHandler[]>;
  }

  export class Entity<T extends EntityProps> extends React.Component<T> {}
  export class Scene<T> extends Entity<T> {
    isScene: boolean;
  }
}
