const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' })

const doc = {
    info: {
        title: 'Notebook API',
        description:
            'An API that allows you to register, login, create and update notes/notebooks.',
    },
    securityDefinitions: {
      bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
      }
    },
    host: 'localhost:3000',
    schemes: ['http'],
}

const outputFile = './swagger-output.json'
const endpointsFiles = ['./server.js']

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc)
