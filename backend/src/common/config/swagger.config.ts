import type { Express, Request, Response } from "express";
import swaggerJsdoc, { Options } from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { config } from "./app.config";

export const SWAGGER_DOCS_PATH = `${config.BASE_PATH}/docs` || "/docs";
export const SWAGGER_JSON_PATH = `${SWAGGER_DOCS_PATH}.json`;

export const swaggerOptions: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Cookbook API",
      version: "0.1.0",
      description: "API documentation for the Cookbook application",
      contact: {
        name: "Sean Conroy",
      },
      license: {
        name: "MIT",
      },
    },
    servers: [
      {
        url: config.BASE_PATH || "/",
        description: `${config.NODE_ENV} server`,
      },
    ],
    tags: [
      {
        name: "Recipes",
        description: "Create, read, update, and delete recipes.",
      },
      {
        name: "System",
        description: "Health and operational endpoints.",
      },
    ],
  },
  apis: [
    "./src/index.ts",
    "./src/routes/*.ts",
    "./src/common/schema/*.ts",
  ],
};

export const specs = swaggerJsdoc(swaggerOptions);

export const registerSwagger = (app: Express): void => {
  if (config.NODE_ENV === "production") {
    return;
  }

  app.get(SWAGGER_JSON_PATH, (_req: Request, res: Response) => {
    res.status(200).json(specs);
  });

  app.use(
    SWAGGER_DOCS_PATH,
    swaggerUi.serve,
    swaggerUi.setup(specs, {
      explorer: true,
      swaggerOptions: {
        url: SWAGGER_JSON_PATH,
      },
    })
  );
};