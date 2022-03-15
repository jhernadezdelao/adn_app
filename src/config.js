import { config } from "dotenv";
config();

export default {
  MONGODB_URI: process.env.MONGODB_HOST || "mongodb://localhost/adndb",
  PORT: process.env.PORT || 4000,
  SECRET: 'adn-api'
};