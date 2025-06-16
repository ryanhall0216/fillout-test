
export type PageIconType = 'info' | 'document' | 'ending';

export interface Page {
  id: string;
  name: string;
  iconType?: PageIconType; // Will be assigned dynamically based on position
}

export interface ContextMenuState {
  pageId: string;
  x: number;
  y: number;
}