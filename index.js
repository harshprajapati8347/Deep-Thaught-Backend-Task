const express = require("express");
const connectToMongo = require("./db");
const cors = require("cors");
require("dotenv").config();
const routesEvents = require("./routes/events");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

connectToMongo();

// Load the YAML file
const swaggerDocument = YAML.load("./swagger.yaml");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

app.use("/api/v3/app", routesEvents);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log("listening app at", `http://localhost:${port}`);
});
