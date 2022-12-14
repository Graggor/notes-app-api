const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')
const fs = require('fs')

// Define the Swagger options for your API
const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        // Like the one described here: https://swagger.io/specification/#infoObject
        info: {
            title: 'Notebook API',
            version: '1.0.0',
            description:
                'An API that allows you to register, login, create and update notes/notebooks.',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        definitions: {
            Note: {
                type: 'object',
                properties: {
                    notebook: {
                        type: 'string',
                        format: 'ObjectId',
                        description:
                            'The ID of the notebook that the note belongs to.',
                    },
                    owner: {
                        type: 'string',
                        format: 'ObjectId',
                        description: 'The ID of the user who owns the note.',
                    },
                    title: {
                        type: 'string',
                        description: 'The title of the note.',
                    },
                    content: {
                        type: 'string',
                        description: 'The content of the note.',
                    },
                    slug: {
                        type: 'string',
                        description: 'The slug of the note.',
                    },
                    createdAt: {
                        type: 'string',
                        format: 'date-time',
                        description:
                            'The date and time that the note was created.',
                    },
                    lastEdit: {
                        type: 'string',
                        format: 'date-time',
                        description:
                            'The date and time that the note was last edited.',
                    },
                },
            },
        },
    },
    // List of files to be processed. You can also set globs './routes/*.js'
    apis: ['./routes/*.js'],
}

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJsdoc(options)

// Export a function that takes the app object as an argument
// and adds the Swagger documentation routes to it
module.exports = (app) => {
  // Serve the Swagger specification at /api-docs.json
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })

  // Serve the Swagger documentation at /api-docs
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    displayOperationId: true,
    defaultModelsExpandDepth: -1,
  }))
}