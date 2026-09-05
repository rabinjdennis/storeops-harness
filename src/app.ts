
import express from "express";

import activityRoutes from "./modules/activities/routes/activityRoutes.js";
import { errorHandler } from "./shared/errors/errorHandler.js";

const app = express();

app.disable("x-powered-by");

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/activities", activityRoutes);
app.use(errorHandler);

export default app;