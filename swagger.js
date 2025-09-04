import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "Credits API",
    description: "Automatic Swagger docs",
  },
  host: "localhost:5000",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./src/app.js"];

swaggerAutogen()(outputFile, endpointsFiles, doc);
