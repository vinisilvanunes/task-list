const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Minha API Express',
    version: '1.0.0',
    description: 'Documentação da minha API feita com Swagger',
  },
  servers: [
    {
      url: 'https://web-a8ivjw1fssag.up-de-fra1-k8s-1.apps.run-on-seenode.com/',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
