import type { SessionResponse } from '@/types/api/session';
import type { Task } from './Task';

/**
 * Represents the Session domain model used within the application.
 * It encapsulates session-related data and logic, providing a clean interface
 * for the UI layer, decoupled from the raw API response.
 */
export class Session {
    id: number;
    taskId?: number;
    startAt: Date;
    name: string;
    planningNotes?: string;
    endReminder?: Date;

    // This property is for UI display purposes and must be provided
    // when creating a Session instance, as it's not part of the
    // SessionResponse DTO.
    taskTitle: string;

    constructor(dto: SessionResponse, task: Task) {
        this.id = dto.id;
        this.taskId = dto.taskId || undefined;
        this.startAt = new Date(dto.startAt);
        this.endReminder = dto.endReminder ? new Date(dto.endReminder) : undefined;
        
        // Map API fields to domain model fields for UI consistency
        this.name = dto.title;
        this.planningNotes = dto.note || undefined;

        this.taskTitle = task.title;
    }
} 