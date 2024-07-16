import env from "../config";
import { checkMicroserviceHealth } from "../services/microserviceHealthServices";
import { MicroService } from "../types";
import { Request, Response } from "express";

const microservices: MicroService[] = [
  {
    name: "series-info-service",
    url: env.SERIES_INFO_URL,
  },
  {
    name: "storage-service",
    url: env.STORAGE_SERVICE_URL,
  },
  {
    name: "extractor-service",
    url: env.EXTRACTION_SERVICE_URL,
  },
  {
    name: "database-service",
    url: env.DATABASE_SERVICE_URL,
  },
];

export const getMicroserviceHealth = async (req: Request, res: Response) => {
  if (!microservices) {
    return await res.send(500).json({ message: "No microservices found" });
  }
  const healthChecks = await Promise.all(
    microservices.map((service) => checkMicroserviceHealth(service))
  );
  return res.status(200).json(healthChecks);
};
