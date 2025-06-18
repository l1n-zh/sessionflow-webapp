/**
 * 統一的 Icon 常數定義
 * 使用 FontAwesome 作為主要 icon 集，
 * 使用 Material Design Icons 作為輔助 icon 集
 */

export const ICONS = {
  // 基本操作
  CLOSE: 'fa-solid fa-xmark',
  MENU: 'fa-solid fa-bars',
  LOADING: 'fa-solid fa-hourglass-start',
  
  // 警告與狀態
  WARNING: 'fa-solid fa-triangle-exclamation',
  ERROR: 'fa-solid fa-circle-exclamation',
  SUCCESS: 'fa-solid fa-circle-check',
  INFO: 'fa-solid fa-circle-info',
  
  // 導航與頁面
  TASKS: 'fa-solid fa-list-check',
  SESSIONS: 'fa-solid fa-clock',
  CALENDAR: 'fa-solid fa-calendar',
  RECORDS: 'fa-solid fa-chart-bar',
  NOT_FOUND: 'fa-solid fa-question-circle',
  
  // 任務相關
  TASK_COMPLETE: 'fa-solid fa-check',
  TASK_REOPEN: 'fa-solid fa-rotate-left',
  TASK_PENDING: 'fa-regular fa-circle',
  TASK_EDIT: 'fa-solid fa-pen',
  TASK_DELETE: 'fa-solid fa-trash',
  
  // 時間相關
  SESSION_START: 'fa-solid fa-play',
  SESSION_END: 'fa-solid fa-stop',
  
  // UI 控制
  CHEVRON_UP: 'fa-solid fa-chevron-up',
  
  // 其他
  ADD: 'fa-solid fa-plus',
  TRIANGLE_UP: 'mdi:mdi-triangle-up',
  TRIANGLE_DOWN: 'mdi:mdi-triangle-down',
  SEARCH: 'fa-solid fa-magnifying-glass',
  FILTER: 'fa-solid fa-filter',
  SETTINGS: 'fa-solid fa-gear',
} as const;

export type IconName = typeof ICONS[keyof typeof ICONS]; 