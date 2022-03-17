import express from "express";
import swaggerUi from "swagger-ui-express";

import { router } from "./routes";
import swaggerFile from "./swagger.json";

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);

app.listen(3333, () => {
    console.log("server is running");
});

app.get("/", (request, response) => {
    const name = "World";
    return response.json({ message: `Hello ${name}!!` });
});
