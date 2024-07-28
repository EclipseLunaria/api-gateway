import { Router } from "express";
import { buildServiceUrl } from "../utils";
import axios from "axios";
import env from "../config";
import { getMicroserviceHealth } from "../controllers/healthControllers";

const healthRouter = Router();

healthRouter.get("/status/", async (req, res) => {
  let html: string | null = null;
  try {
    const endpointPath = buildServiceUrl(
      `http://localhost:${env.SERIES_INFO_PORT}`,
      "/status"
    );
    html = (await axios.get(endpointPath)).data;
    if (!html) {
      throw Error("No response from series api");
    }
    res.status(200).send(html);
  } catch (e: any) {
    console.error(
      `Error fetching status: ${e}, ${typeof e}, ${Object.entries(e)}`
    );
    res.status(500).send(`Error fetching status: ${e}`);
  }
});

healthRouter.get("/microservices/", getMicroserviceHealth);

export { healthRouter };
