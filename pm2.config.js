const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  apps: [
    {
      name: "gateway",
      script: "index.ts", // Specify the entry file
      interpreter: "npx", // Use 'npx' as the interpreter
      interpreterArgs: "ts-node", // Use 'ts-node' as an argument for the interpreter
      cwd: path.join(__dirname, "gateway"), // Ensure this path is correct
      watch: true, // Enable watch mode
      ignore_watch: ["node_modules"], // Ignore changes in node_modules
      env: {
        NODE_ENV: "developmemt",
        DB_HOST: process.env.DB_HOST,
        DB_PORT: process.env.DB_PORT,
        DB_USER: process.env.DB_USER,
        DB_PASS: process.env.DB_PASS,
        DB_NAME: process.env.DB_NAME
      },
      env_production: {
        NODE_ENV: "production",
        DB_HOST: process.env.DB_HOST,
        DB_PORT: process.env.DB_PORT,
        DB_USER: process.env.DB_USER,
        DB_PASS: process.env.DB_PASS,
        DB_NAME: process.env.DB_NAME
      },
    },
  ],
};
