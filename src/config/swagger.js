const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API PetShop",
      version: "1.0.0",
      description: "Documentação da API do PetShop",
    },
    servers: [
      {
        url: "http://localhost:3001/api",
        description: "Servidor Local",
      },
    ],
  },
  apis: [__dirname + "/../routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

const swaggerDocs = (app) => {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("📜 Swagger Docs disponível em http://localhost:3001/api/docs");
};

module.exports = swaggerDocs;
