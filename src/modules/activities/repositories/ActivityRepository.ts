import type { Activity } from "../models/Activity.js";

export class ActivityRepository {
  private readonly activities: Activity[] = [];

  findAll(): Activity[] {
    return [...this.activities];
  }

  findById(id: string): Activity | undefined {
    return this.activities.find((activity) => activity.id === id);
  }

  save(activity: Activity): Activity {
    this.activities.push(activity);
    return activity;
  }

  update(
    id: string,
    updates: Partial<Activity>,
  ): Activity | undefined {
    const activity = this.findById(id);

    if (!activity) {
      return undefined;
    }

    Object.assign(activity, updates);

    return activity;
  }
}