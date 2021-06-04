import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";

import dbConnection from "./database/typeorm";
import { router } from "./shared/http/routes";
import "./shared/container";

const app = express();
app.use(express.json());

// creating dadatabase connection
dbConnection("localhost");

app.use("/api", router);
app.use(
    (
        error: Error,
        request: Request,
        response: Response,
        next: NextFunction
    ) => {
        response.status(500).json({ error, message: error.message });
    }
);
export { app };
