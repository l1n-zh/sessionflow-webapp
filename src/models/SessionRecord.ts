import type { SessionRecordResponse } from '@/types/api/sessionRecord';

export class SessionRecord {
    id: number;
    title: string;
    taskId?: number | null;
    taskTitle?: string;
    startTime: Date;
    endTime: Date;
    plannedNote?: string | null;
    completionNote?: string | null;

    constructor(dto: SessionRecordResponse, taskTitle?: string) {
        this.id = dto.id;
        this.title = dto.title;
        this.taskId = dto.taskId;
        this.taskTitle = taskTitle;
        this.startTime = new Date(dto.startAt);
        this.endTime = new Date(dto.endAt);
        this.plannedNote = dto.plannedNote;
        this.completionNote = dto.completionNote;
    }

    get duration(): number {
        return this.endTime.getTime() - this.startTime.getTime();
    }

    get formattedDuration(): string {
        const totalSeconds = Math.floor(this.duration / 1000);
        const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
        const seconds = (totalSeconds % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    }
} 