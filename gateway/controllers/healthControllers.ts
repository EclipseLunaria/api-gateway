import env from "../config";
import { checkMicroserviceHealth } from "../services/microserviceHealthServices";
import { MicroService } from "../types";
import { Request, Response } from "express";

const microservices: MicroService[] = [
  {
    name: "series-info-service",
    url: `http://localhost:${env.SERIES_INFO_PORT}`,
  },
  {
    name: "storage-service",
    url: `http://localhost:${env.STORAGE_PORT}`,
  },
  {
    name: "distribution-service",
    url: `http://localhost:${env.DISTRIBUTION_PORT}`,
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
