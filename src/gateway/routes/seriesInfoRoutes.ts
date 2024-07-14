import { Router } from "express";
import env from "../config";
import axios from "axios";
import { buildServiceUrl } from "../utils";
const seriesRouter = Router();

seriesRouter.get("/status/", async (req, res) => {
  let html: string | null = null;
  try {
    const endpointPath = buildServiceUrl(env.SERIES_INFO_URL, "/status");
    html = (await axios.get(endpointPath)).data;
    if (!html) {
      throw Error("No response from series api");
    }
    res.status(200).send("OK");
  } catch (e: any) {
    console.error(
      `Error fetching status: ${e}, ${typeof e}, ${Object.entries(e)}`
    );
    res.status(500).send(`Error fetching status: ${e}`);
  }
});

export { seriesRouter };
