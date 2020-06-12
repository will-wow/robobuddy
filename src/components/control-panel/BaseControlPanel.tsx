import { AppState } from "store/reducer";

export interface BaseControlPanelProps {
  state: AppState;
  onPlay(): void;
  onSound(): void;
  onRecall(): void;
}
