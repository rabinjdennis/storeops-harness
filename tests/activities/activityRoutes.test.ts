import request from "supertest";

import app from "../../src/app.js";

describe("Activity API", () => {
  it("returns an empty activity list initially", async () => {
    const response = await request(app)
      .get("/api/activities")
      .expect(200);

    expect(response.body).toEqual([]);
  });
});

it("creates an activity", async () => {
  const response = await request(app)
    .post("/api/activities")
    .send({
      name: "Stock check",
      description: "Check store stock levels",
    })
    .expect(201);

  expect(response.body.name).toBe("Stock check");
  expect(response.body.description).toBe("Check store stock levels");
  expect(response.body.status).toBe("PLANNED");
  expect(response.body.id).toBeDefined();
  expect(response.body.createdAt).toBeDefined();
});

it("returns an activity by id", async () => {
  const createResponse = await request(app)
    .post("/api/activities")
    .send({
      name: "Inventory check",
      description: "Check inventory levels",
    })
    .expect(201);

  const activityId = createResponse.body.id;

  const response = await request(app)
    .get(`/api/activities/${activityId}`)
    .expect(200);

  expect(response.body.id).toBe(activityId);
  expect(response.body.name).toBe("Inventory check");
  expect(response.body.description).toBe("Check inventory levels");
});

it("returns 404 when an activity does not exist", async () => {
  const response = await request(app)
    .get("/api/activities/does-not-exist")
    .expect(404);

  expect(response.body).toEqual({
    code: "ACTIVITY_NOT_FOUND",
    message: "Activity 'does-not-exist' was not found",
  });
});