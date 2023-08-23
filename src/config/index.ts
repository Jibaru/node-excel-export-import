import * as dotenv from "dotenv";

dotenv.config();

export const config = {
  serverHost: process.env.SERVER_HOST,
  serverPort: process.env.SERVER_PORT,
};
