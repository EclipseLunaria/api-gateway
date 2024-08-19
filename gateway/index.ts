import express from "express";
import { Request, Response } from "express";
import { seriesRouter } from "./routes/seriesInfoRoutes";
import chapterFetchRouter from "./routes/chapterFetchingRouter";

const app = express();
app.use(express.json());
app.use((req: Request, res: Response, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // or specify allowed origins
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
app.use("/manga", seriesRouter);
app.use("/fetch", chapterFetchRouter);

// basic operation to check if the gateway is working
app.get("/", (req: Request, res: Response) => {
  res.send("Gateway is online.");
});

export default app;
