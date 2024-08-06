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
      cwd: "./microservices/series-info",
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
      cwd: "./microservices/distribution",
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
      cwd: "./microservices/storage",
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
      name: "database",
      script: "ts-node",
      args: "src/index.ts",
      cwd: "./microservices/database",
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
