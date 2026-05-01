import { Router, Request, Response } from "express";

type RocketRange = "suborbital" | "orbital" | "moon" | "mars";

interface Rocket {
  id: string;
  name: string;
  range: RocketRange;
  capacity: number;
}

type RocketCreate = Omit<Rocket, "id">;
type RocketUpdate = Partial<Omit<Rocket, "id">>;

const validRanges: RocketRange[] = ["suborbital", "orbital", "moon", "mars"];
const rockets: Rocket[] = [];
let nextRocketId = 1;

const router = Router();

const validateRocket = (rocket: RocketCreate | RocketUpdate): string | null => {
  if ("name" in rocket && typeof rocket.name !== "string") {
    return "Name must be a string.";
  }

  if (rocket.name?.trim() === "") {
    return "Name is required.";
  }

  if ("range" in rocket) {
    if (typeof rocket.range !== "string" || !validRanges.includes(rocket.range as RocketRange)) {
      return "Range must be one of: suborbital, orbital, moon, mars.";
    }
  }

  if ("capacity" in rocket) {
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

router.post("/rockets", (req: Request, res: Response) => {
  const rocket = req.body as RocketCreate;
  const validationError = validateRocket(rocket);

  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  if (!rocket.name || !rocket.range || rocket.capacity === undefined) {
    return res.status(400).json({ error: "Name, range, and capacity are required." });
  }

  const newRocket: Rocket = {
    id: String(nextRocketId++),
    name: rocket.name.trim(),
    range: rocket.range,
    capacity: rocket.capacity,
  };

  rockets.push(newRocket);
  return res.status(201).json(newRocket);
});

router.get("/rockets/:id", (req: Request, res: Response) => {
  const id = String(req.params.id);
  const rocket = findRocket(id);
  if (!rocket) {
    return res.status(404).json({ error: "Rocket not found." });
  }
  return res.json(rocket);
});

router.put("/rockets/:id", (req: Request, res: Response) => {
  const id = String(req.params.id);
  const rocket = findRocket(id);
  if (!rocket) {
    return res.status(404).json({ error: "Rocket not found." });
  }

  const payload = req.body as RocketUpdate;
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

router.delete("/rockets/:id", (req: Request, res: Response) => {
  const id = String(req.params.id);
  const index = rockets.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Rocket not found." });
  }

  rockets.splice(index, 1);
  return res.status(204).send();
});

export { router as rocketsRouter };
