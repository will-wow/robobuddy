import { Component } from "aframe";

export type CompDefinition<
  Data extends object = any,
  State = object,
  Methods = object
> = Partial<Component<Data>> &
  Methods &
  ThisType<Component<Data> & State & Methods>;
