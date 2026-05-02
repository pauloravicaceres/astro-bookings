import { startServer } from "./server.js";
import { info } from "./logger.js";

info("Starting application");
await startServer();
info("Application startup complete");
