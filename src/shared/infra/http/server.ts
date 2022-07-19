import { app } from "./app";

app.listen(3333, () => {
    console.log("server is running on port 3333");
});

app.get("/", (request, response) => {
    const name = "World";
    return response.json({ message: `Hello ${name}!!` });
});
