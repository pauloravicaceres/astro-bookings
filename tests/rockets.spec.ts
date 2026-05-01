import { test, expect } from "@playwright/test";

test("rocket management API lifecycle and validation", async ({ request }) => {
  const createResponse = await request.post("/api/rockets", {
    data: {
      name: "Falcon 1",
      range: "orbital",
      capacity: 5,
    },
  });

  expect(createResponse.status()).toBe(201);
  const rocket = await createResponse.json();
  expect(rocket).toMatchObject({
    id: expect.any(String),
    name: "Falcon 1",
    range: "orbital",
    capacity: 5,
  });

  const getResponse = await request.get(`/api/rockets/${rocket.id}`);
  expect(getResponse.ok()).toBeTruthy();
  expect(await getResponse.json()).toEqual(rocket);

  const listResponse = await request.get("/api/rockets");
  expect(listResponse.ok()).toBeTruthy();
  expect(await listResponse.json()).toEqual(expect.arrayContaining([rocket]));

  const updateResponse = await request.put(`/api/rockets/${rocket.id}`, {
    data: {
      name: "Falcon X",
      range: "moon",
      capacity: 8,
    },
  });
  expect(updateResponse.ok()).toBeTruthy();
  expect(await updateResponse.json()).toMatchObject({
    id: rocket.id,
    name: "Falcon X",
    range: "moon",
    capacity: 8,
  });

  const invalidRangeResponse = await request.post("/api/rockets", {
    data: {
      name: "Invalid Rocket",
      range: "deep-space",
      capacity: 4,
    },
  });
  expect(invalidRangeResponse.status()).toBe(400);
  expect(await invalidRangeResponse.json()).toEqual({ error: "Range must be one of: suborbital, orbital, moon, mars." });

  const invalidCapacityResponse = await request.post("/api/rockets", {
    data: {
      name: "Big Rocket",
      range: "mars",
      capacity: 12,
    },
  });
  expect(invalidCapacityResponse.status()).toBe(400);
  expect(await invalidCapacityResponse.json()).toEqual({ error: "Capacity must be between 1 and 10." });

  const deleteResponse = await request.delete(`/api/rockets/${rocket.id}`);
  expect(deleteResponse.status()).toBe(204);

  const deletedGetResponse = await request.get(`/api/rockets/${rocket.id}`);
  expect(deletedGetResponse.status()).toBe(404);
});
