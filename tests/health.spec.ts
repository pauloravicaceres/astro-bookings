import { test, expect } from "@playwright/test";

test("health endpoint returns ok", async ({ request }) => {
  const response = await request.get("/health");
  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  expect(body).toMatchObject({ status: "ok" });
  expect(typeof body.uptime).toBe("number");
  expect(typeof body.timestamp).toBe("string");
});
