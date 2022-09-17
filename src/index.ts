import express, { Express } from "express";
import path from "path";

import { router as authRouter } from "./routes/auth";

import code500Middleware from "./middlewares/errors/500.middleware";
import code404Middleware from "./middlewares/errors/404.middleware";
import envResolver from "./utils/envResolver.util";

envResolver();

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

app.listen(port, () => {
    console.log(`⚡ Server is running at localhost:${port}`);
});

app.use(code404Middleware);
app.use(code500Middleware);
