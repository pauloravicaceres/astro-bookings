import express from "express";

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

app.get("/health", (_req, res) => {
  res.json({ status: "ok", uptime: process.uptime(), timestamp: new Date().toISOString() });
});

export const startServer = (): void => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
};
