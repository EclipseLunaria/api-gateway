import express from "express";
import { Request, Response } from "express";
import { seriesRouter } from "./routes/series.routes";
import chapterFetchRouter from "./routes/fetch.routes";
import ipTrackerMiddleware from "./middlewares/ipTracker.middleware";
import searchRouter from "./routes/search.routes";

const app = express();
app.set("trust proxy", "loopback");
app.use(express.json());
app.use(ipTrackerMiddleware);
app.use((req: Request, res: Response, next) => {
  const allowedOrigins = [
    "http://localhost:6969",
    "https://manga.eclipselunaria.dev",
    "https://mangaflux.net",
  ];
  const origin = req.headers.origin as string;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});
app.use("/manga", seriesRouter);
app.use("/fetch", chapterFetchRouter);
app.use("/search", searchRouter);

// basic operation to check if the gateway is working
app.get("/", (req: Request, res: Response) => {
  res.send("Gateway is online.");
});

export default app;
