const path = require("path");

module.exports = {
  apps: [
    {
      name: "gateway",
      script: `"${path.join(__dirname, "node_modules/.bin/ts-node")}"`,
      args: "./server.ts",
      cwd: path.join(__dirname, "gateway"),
      watch: true, // Enable watch mode
      ignore_watch: ["node_modules"],
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
