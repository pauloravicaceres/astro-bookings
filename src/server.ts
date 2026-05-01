import http from "http";
import express from "express";

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 3000;
const server = http.createServer(app);

app.get("/health", (_req, res) => {
  res.json({ status: "ok", uptime: process.uptime(), timestamp: new Date().toISOString() });
});

export const startServer = async (): Promise<http.Server> => {
  return new Promise((resolve) => {
    server.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
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
