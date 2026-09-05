import { randomUUID } from "node:crypto";

import { AppError } from "../../../shared/errors/AppError.js";
import type { Activity } from "../models/Activity.js";
import { ActivityRepository } from "../repositories/ActivityRepository.js";

export interface CreateActivityInput {
  name: string;
  description: string;
}

export class ActivityService {
  constructor(
    private readonly activityRepository: ActivityRepository,
  ) {}

  getAllActivities(): Activity[] {
    return this.activityRepository.findAll();
  }

  getActivityById(id: string): Activity {
    const activity = this.activityRepository.findById(id);

    if (!activity) {
      throw new AppError(
        "ACTIVITY_NOT_FOUND",
        `Activity '${id}' was not found`,
        404,
      );
    }

    return activity;
  }

  createActivity(input: CreateActivityInput): Activity {
    if (!input.name.trim()) {
      throw new AppError(
        "INVALID_ACTIVITY_NAME",
        "Activity name is required",
        400,
      );
    }

    if (!input.description.trim()) {
      throw new AppError(
        "INVALID_ACTIVITY_DESCRIPTION",
        "Activity description is required",
        400,
      );
    }

    const activity: Activity = {
      id: randomUUID(),
      name: input.name.trim(),
      description: input.description.trim(),
      status: "PLANNED",
      createdAt: new Date().toISOString(),
    };

    return this.activityRepository.save(activity);
  }
}