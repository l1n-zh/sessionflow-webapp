// Utility Types
export type TaskStatus = 'PENDING' | 'COMPLETE';

export type NotificationType = 
  | 'task_create' | 'task_update' | 'task_delete'
  | 'session_create' | 'session_delete'
  | 'session_record_create' | 'session_record_update' | 'session_record_delete'
  | 'schedule_entry_create' | 'schedule_entry_update' | 'schedule_entry_delete'
  | 'tag_create' | 'tag_update' | 'tag_delete';

// Updated TagColor type to accept any valid hex color
export type TagColor = `#${string}`;

// Helper function to validate hex color format
export const isValidHexColor = (color: string): color is TagColor => {
  return /^#([0-9A-Fa-f]{3}){1,2}$/.test(color);
};

// Predefined color palette (optional, for UI color picker)
export const PREDEFINED_TAG_COLORS: TagColor[] = [
  '#fecaca', '#fed7aa', '#fef3c7', '#d9f99d', '#a7f3d0',
  '#a5f3fc', '#bfdbfe', '#c4b5fd', '#f0abfc', '#e5e7eb'
]; 