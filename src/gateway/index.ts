import express from "express";
import { seriesRouter } from "./routes/seriesInfoRoutes";
const app = express();
app.use(express.json());
app.use("/series", seriesRouter);

app.get("/", (req, res) => {
  res.send("api gateway is working");
});

export default app;
