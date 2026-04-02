import express from "express";
import cors from "cors";
import { authRouter } from "../src/modules/auth/auth.route.js";
import { driversRouter } from "../src/modules/drivers/drivers.route.js";

import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

app.use("/api/users", authRouter);
app.use("api/drivers", driversRouter);

app.use(errorHandler);

export default app;
