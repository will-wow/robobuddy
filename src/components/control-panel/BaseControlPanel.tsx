import { AppState } from "store/reducer";

export interface BaseControlPanelProps {
  state: AppState;
  onSound: () => void;
}