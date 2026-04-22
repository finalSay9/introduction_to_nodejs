import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import usersRouter from "./routes/users.js";

const app = express();

app.use(express.json()); // important — parses JSON request bodies

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation",
    },
  },
  apis: ["./routes/*.js"], // path to your route files
};

const swaggerSpec = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/users", usersRouter); // 👈 register users routes

app.get("/", (req, res) => {
  res.send("Server is working!");
});

app.listen(3006, () => {
  console.log("Server running on http://localhost:3006");
});