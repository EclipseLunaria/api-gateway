import axios from "axios";
import { MicroService } from "../types";
import { isDev } from "../utils";

export const checkMicroserviceHealth = async (serviceHost: MicroService) => {
  const serviceUrl = `${serviceHost.url}/common/status`;
  console.log(`Checking health of ${serviceHost.name} at ${serviceUrl}`);
  const timeSent = Date.now();
  try {
    const response = await axios.get(serviceUrl);
    return {
      name: serviceHost.name,
      isOnline: true,
      status: response.status,
      ping: Date.now() - timeSent,
      message: response.data,
    };
  } catch (error: any) {
    isDev() &&
      console.error(
        `Error fetching status for ${serviceHost.name}: ${error.message}`
      );
    return {
      name: serviceHost.name,
      isOnline: false,
      ping: Date.now() - timeSent,
      message: `Error: ${error.name}`,
      status: error.response ? error.response.status : 404,
    };
  }
};
