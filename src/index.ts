import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import { router as authRouter } from "./routes/auth";
import path from "path";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(
    express.urlencoded({
        extended: false,
    })
);

app.use("/auth", authRouter);

app.get("/", (req: Request, res: Response) => {
    res.end();
});

app.listen(port, () => {
    console.log(`[server]: Server is running at https:///localhost:${port}`);
});
