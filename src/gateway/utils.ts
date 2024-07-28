const buildServiceUrl = (baseUrl: string, path: string) => {
  return `${baseUrl.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
};

const isDev = () => {
  return process.env.NODE_ENV !== "production";
};

export { buildServiceUrl, isDev };
