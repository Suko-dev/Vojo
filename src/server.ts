import "reflect-metadata";
import express from "express";

import dbConnection from "./database";
import { router } from "./shared/http/routes";
import "./shared/container";

const app = express();
app.use(express.json());

// creating dadatabase connection
dbConnection("database");

app.use("/api", router);
export { app };
