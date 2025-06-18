// WebSocket Types
export interface ResourceChangedNotification<T = any> {
  notificationType: string;
  id?: number;
  ids?: number[];
  data?: T;
  affected?: Affected[];
  timestamp: number;
}

export interface Affected {
  notificationType: string;
  ids: number[];
} 