import { ActivityRepository } from "../../src/modules/activities/repositories/ActivityRepository.js";
import { ActivityService } from "../../src/modules/activities/services/ActivityService.js";

describe("ActivityService", () => {
  function createService(): ActivityService {
    const repository = new ActivityRepository();
    return new ActivityService(repository);
  }

  it("creates an activity", () => {
    const service = createService();

    const activity = service.createActivity({
      name: "Store inspection",
      description: "Complete the scheduled store inspection",
    });

    expect(activity.name).toBe("Store inspection");
    expect(activity.description).toBe(
      "Complete the scheduled store inspection",
    );
    expect(activity.status).toBe("PLANNED");
    expect(activity.id).toBeDefined();
    expect(activity.createdAt).toBeDefined();
  });

  it("returns all activities", () => {
    const service = createService();

    service.createActivity({
      name: "Store inspection",
      description: "Complete the scheduled store inspection",
    });

    service.createActivity({
      name: "Stock check",
      description: "Check store stock levels",
    });

    const activities = service.getAllActivities();

    expect(activities).toHaveLength(2);
  });

  it("throws AppError when an activity does not exist", () => {
    const service = createService();

    expect(() => service.getActivityById("missing-id")).toThrow(
      "Activity 'missing-id' was not found",
    );
  });

  it("rejects an empty activity name", () => {
    const service = createService();

    expect(() =>
      service.createActivity({
        name: "   ",
        description: "A valid description",
      }),
    ).toThrow("Activity name is required");
  });

  it("rejects an empty activity description", () => {
    const service = createService();

    expect(() =>
      service.createActivity({
        name: "Store inspection",
        description: "   ",
      }),
    ).toThrow("Activity description is required");
  });
});