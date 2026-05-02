import http from "http";
import express from "express";
import { rocketsRouter } from "./rockets.js";
import { info, error as logError } from "./logger.js";

const app = express();
const port = Number(process.env.PORT ?? 3000);
const server = http.createServer(app);

app.use(express.json());

app.use((req, _res, next) => {
  info(`${req.method} ${req.url}`);
  next();
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok", uptime: process.uptime(), timestamp: new Date().toISOString() });
});

app.use("/api", rocketsRouter);

// basic error logging
app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  logError("Unhandled error in request handler", err as any);
  res.status(500).json({ error: "Internal Server Error" });
});

export const startServer = async (): Promise<http.Server> => {
  return new Promise((resolve) => {
    server.listen(port, () => {
      info(`Server running on http://localhost:${port}`);
      resolve(server);
    });
  });
};

export const stopServer = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    server.close((err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};
