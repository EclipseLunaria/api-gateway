import axios, { AxiosError } from "axios";
import { MicroService, MicroServiceStatus } from "../types";
import { isDev } from "../utils";

export const checkMicroserviceHealth = async (serviceHost: MicroService) => {
  let serviceStatus: MicroServiceStatus = {
    name: serviceHost.name,
    status: 404,
    isOnline: false,
  };
  const startTime = Date.now();
  try {
    const serviceUrl = `${serviceHost.url}/shared/status`;
    // fetch url using axios with ping

    const response = await axios.get(serviceUrl);
    const endTime = Date.now();
    serviceStatus.status = response.status;
    serviceStatus.ping = endTime - startTime;
    serviceStatus.isOnline = true;
  } catch (error: any) {
    const endTime = Date.now();
    serviceStatus.ping = endTime - startTime;
    console.error(`Error fetching status: ${error}`);

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      serviceStatus.message = `${axiosError.message}`;
      isDev() ? `: ${error.stack}` : "";
      if (axiosError.response) {
        serviceStatus.status = axiosError.response.status;
      } else {
      }
    }
  }
  return serviceStatus;
};
