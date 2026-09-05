import { Router } from "express";

import { ActivityRepository } from "../repositories/ActivityRepository.js";
import { ActivityService } from "../services/ActivityService.js";

const activityRepository = new ActivityRepository();
const activityService = new ActivityService(activityRepository);

const router = Router();

router.get("/", (_req, res) => {
  const activities = activityService.getAllActivities();

  res.json(activities);
});

router.post("/", (req, res) => {
  const activity = activityService.createActivity({
    name: req.body.name,
    description: req.body.description,
  });

  res.status(201).json(activity);
});

router.get("/:id", (req, res) => {
  const activity = activityService.getActivityById(req.params.id);

  res.json(activity);
});

export default router;