import "reflect-metadata";
import express from "express";

import dbConnection from "./database/typeorm";
import { router } from "./shared/http/routes";
import "./shared/container";

const app = express();
app.use(express.json());

// creating dadatabase connection
dbConnection("localhost");

app.use("/api", router);

export { app };
