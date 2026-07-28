import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { add } from "./calculator.js";

const app = express();
const port = Number(process.env.PORT || 3000);
const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const publicDirectory = path.resolve(currentDirectory, "../public");

app.disable("x-powered-by");
app.use(express.json({ limit: "16kb" }));

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok" });
});

app.post("/api/add", (request, response) => {
  try {
    const { x, y } = request.body ?? {};
    const result = add(x, y);
    response.json({ x: Number(x), y: Number(y), result });
  } catch (error) {
    response.status(400).json({
      error: error instanceof Error ? error.message : "Invalid calculation request."
    });
  }
});

app.use(express.static(publicDirectory));

app.get("/{*splat}", (_request, response) => {
  response.sendFile(path.join(publicDirectory, "index.html"));
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Calculator application listening on port ${port}`);
});
