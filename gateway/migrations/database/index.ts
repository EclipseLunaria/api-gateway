import express from "express";
import { AppDataSource } from "./data-source";
import seriesInfoRouter from "./routes/seriesInfoRoutes";
AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully");

    const app = express();
    app.use(express.json({ limit: "50mb" }));
    const PORT = process.env.SERVER_PORT || 6999;
    app.get("/", (req, res) => {
      res.send("Data Layer Service is online.");
    });

    app.use("/series", seriesInfoRouter);

    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
    // here you can start to work with your database
  })
  .catch((error) => console.log(error));
