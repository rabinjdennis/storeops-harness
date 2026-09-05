export interface Activity {
  id: string;
  name: string;
  description: string;
  status: ActivityStatus;
  createdAt: string;
}

export type ActivityStatus =
  | "PLANNED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";