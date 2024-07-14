import app from ".";
import { seriesRouter } from "./routes/seriesInfoRoutes";

const PORT = process.env.PORT || 6969;
app.use("/series", seriesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
