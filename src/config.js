const { config } =require("dotenv");
config();

module.exports= {
  MONGODB_URI: process.env.MONGODB_HOST || "mongodb://localhost/adndb",
  PORT: process.env.PORT || 4000,
  SECRET: 'adn-api'
};