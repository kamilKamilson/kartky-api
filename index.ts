import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import { router as authRouter } from "./routes/auth";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(
    express.urlencoded({
        extended: false,
    })
);

app.use("/auth", authRouter);

app.get("/", (req: Request, res: Response) => {
    console.log(req.url);
    res.end();
});

app.listen(port, () => {
    console.log(`[server]: Server is running at https:///localhost:${port}`);
});
