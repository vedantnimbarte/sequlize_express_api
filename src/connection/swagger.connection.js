/**
 * Configuration parameter enable Swagger on the project.
 */
const swaggerDefinition = {
    openapi: "3.0.1",
    info: {
        title: "REST API",
        version: '1.0.0',
    },
    servers: [
        {
            url: "http://localhost:3003",
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
    },
    security: [
        {
            bearerAuth: [],
        },
    ],
}

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

var path = require("path");

const swaggerOptions = {
    swaggerDefinition,
    apis: [path.resolve(__dirname, "./../api/router/*.*.js")]
};

/**
 * Configura o Swagger UI para a aplicação expressjs.
 * @param {express} app Aplicação express
 */
const setup = app => app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerOptions)));

module.exports = setup;