module.exports = {
  apps: [
    {
      name: "gateway",
      script: "ts-node",
      args: "./server.ts",
      cwd: "./gateway",
      watch: true, // Enable watch mode
      ignore_watch: ["node_modules"],
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
    {
      name: "seriesInfo",
      script: "ts-node",
      args: "src/index.ts",
      cwd: "./microservices/series-info-service",
      watch: true, // Enable watch mode
      ignore_watch: ["node_modules"],
      env: {
        NODE_ENV: "development",
        DB_PORT: 6999,
        DB_HOST: "localhost",
      },
      env_production: {
        NODE_ENV: "production",
        DB_PORT: 6999,
        DB_HOST: "localhost",
      },
    },
    {
      name: "distribution",
      script: "ts-node",
      args: "src/index.ts",
      cwd: "./microservices/distribution-service",
      watch: true, // Enable watch mode
      ignore_watch: ["node_modules"],
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
    {
      name: "storage",
      script: "ts-node",
      args: "src/index.ts",
      cwd: "./microservices/storage-service",
      watch: true, // Enable watch mode
      ignore_watch: ["node_modules"],
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
    {
      name: "data-layer",
      script: "ts-node",
      args: "src/index.ts",
      cwd: "./microservices/data-layer-service",
      watch: true, // Enable watch mode
      ignore_watch: ["node_modules"],
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
    {
      name: "Authentication",
      script: "ts-node",
      args: "src/index.ts",
      cwd: "./microservices/auth",
      watch: true, // Enable watch mode
      ignore_watch: ["node_modules"],
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
