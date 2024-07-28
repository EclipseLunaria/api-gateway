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
      },
      env_production: {
        NODE_ENV: "production",
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
    // {
    //   name: "series-info-service",
    //   script: "ts-node",
    //   args: "src/index.ts",
    //   cwd: "./microservices/series-info-service",
    //   watch: true, // Enable watch mode
    //   ignore_watch: ["node_modules"],
    //   env: {
    //     NODE_ENV: "development",
    //   },
    //   env_production: {
    //     NODE_ENV: "production",
    //   },
    // },
  ],
};
