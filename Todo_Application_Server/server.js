import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import database from "./database/dbConnection.js";

const app = express();
dotenv.config({ path: "./config/config.env" });

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// This is connected with frontend:-
app.use(
  cors({
    origin: [process.env.CLIENT_URI],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

import { errorMiddleware } from "./middlewares/error.js";
import taskRouter from "./routes/taskRoute.js";


app.use("/api/v1", taskRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await database();
  console.log(`Server listen at PORT No. ${PORT}`);
});
