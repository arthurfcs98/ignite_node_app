import express from "express";

import { router } from "./routes";

const app = express();

app.use(express.json());
app.use(router);

app.listen(3333, () => {
    console.log("server is running");
});

app.get("/", (request, response) => {
    const name = "World";
    return response.json({ message: `Hello ${name}!!` });
});
