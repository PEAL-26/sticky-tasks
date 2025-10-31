export type TaskStatusTypes = "STATED" | "PENDING" | "DONE";

export type TaskListData = {
  id: number;
  title: string;
  progress: number;
  subtasks: { id: number; description: string }[];
  totalSubtasks: 0;
  updatedAt: string;
};

export type GroupListData = {
  id: number;
  group?: { id: number; name: string } | null;
  subtasks: SubtaskListData[]
};

export type SubtaskListData = {
  id?: number;
  description: string;
  responsible?: { id: number; name: string } | null;
  priority?: 0 | 1 | 2;
  status?: TaskStatusTypes;
};

export type TaskType = {
  id: number;
  title: string;
  progress: number; // 0-100
  subtasks: {
    id: number;
    description: string;
    group?: { id: number; name: string } | null;
    note?: string;
    responsible?: { id: number; name: string } | null;
    priority?: 0 | 1 | 2;
    status?: TaskStatusTypes;
    createdAt: Date;
    updatedAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
};
