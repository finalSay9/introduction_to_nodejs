import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Simple Swagger config
const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "My API",
    version: "1.0.0",
    description: "Simple Express API with Swagger",
  },
  servers: [
    {
      url: "http://localhost:3006",
    },
  ],
  paths: {}, // Empty for now
};

// Swagger route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Test route
app.get("/", (req, res) => {
  res.send("Server is working!");
});

app.listen(3006, () => {
  console.log("Server running on http://localhost:3006");
  console.log("Docs at http://localhost:3006/api-docs");
});