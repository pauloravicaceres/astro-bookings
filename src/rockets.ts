import { Router, Request, Response } from "express";

const validRanges = ["suborbital", "orbital", "moon", "mars"] as const;

type RocketRange = (typeof validRanges)[number];

interface Rocket {
  id: string;
  name: string;
  range: RocketRange;
  capacity: number;
}

type RocketCreate = Omit<Rocket, "id">;
type RocketUpdate = Partial<RocketCreate>;

type RocketRequest<T> = Request<Record<string, never>, unknown, T>;

const rockets: Rocket[] = [];
let nextRocketId = 1;

const router = Router();

const isValidRange = (value: unknown): value is RocketRange =>
  typeof value === "string" && validRanges.includes(value as RocketRange);

const validateRocket = (rocket: RocketCreate | RocketUpdate): string | null => {
  if ("name" in rocket && rocket.name !== undefined && typeof rocket.name !== "string") {
    return "Name must be a string.";
  }

  if (rocket.name?.trim() === "") {
    return "Name is required.";
  }

  if ("range" in rocket && rocket.range !== undefined && !isValidRange(rocket.range)) {
    return "Range must be one of: suborbital, orbital, moon, mars.";
  }

  if ("capacity" in rocket && rocket.capacity !== undefined) {
    if (typeof rocket.capacity !== "number" || !Number.isInteger(rocket.capacity)) {
      return "Capacity must be an integer.";
    }
    if (rocket.capacity < 1 || rocket.capacity > 10) {
      return "Capacity must be between 1 and 10.";
    }
  }

  return null;
};

const findRocket = (id: string): Rocket | undefined => rockets.find((rocket) => rocket.id === id);

router.get("/rockets", (_req: Request, res: Response) => {
  res.json(rockets);
});

router.post("/rockets", (req: RocketRequest<RocketCreate>, res: Response) => {
  const rocket = req.body;
  const validationError = validateRocket(rocket);

  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  if (rocket.name === undefined || rocket.range === undefined || rocket.capacity === undefined) {
    return res.status(400).json({ error: "Name, range, and capacity are required." });
  }

  const newRocket: Rocket = {
    id: `${nextRocketId++}`,
    name: rocket.name.trim(),
    range: rocket.range,
    capacity: rocket.capacity,
  };

  rockets.push(newRocket);
  return res.status(201).json(newRocket);
});

router.get("/rockets/:id", (req: Request<{ id: string }>, res: Response) => {
  const rocket = findRocket(req.params.id);

  if (!rocket) {
    return res.status(404).json({ error: "Rocket not found." });
  }

  return res.json(rocket);
});

router.put("/rockets/:id", (req: Request<{ id: string }, unknown, RocketUpdate>, res: Response) => {
  const rocket = findRocket(req.params.id);

  if (!rocket) {
    return res.status(404).json({ error: "Rocket not found." });
  }

  const payload = req.body;
  const validationError = validateRocket(payload);

  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  if (payload.name !== undefined) {
    rocket.name = payload.name.trim();
  }
  if (payload.range !== undefined) {
    rocket.range = payload.range;
  }
  if (payload.capacity !== undefined) {
    rocket.capacity = payload.capacity;
  }

  return res.json(rocket);
});

router.delete("/rockets/:id", (req: Request<{ id: string }>, res: Response) => {
  const index = rockets.findIndex((item) => item.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: "Rocket not found." });
  }

  rockets.splice(index, 1);
  return res.status(204).end();
});

export { router as rocketsRouter };
