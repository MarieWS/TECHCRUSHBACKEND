import swaggerJsDoc from "swagger-jsdoc";

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Delish Nutrio",  
            version: "1.0.0",   
            description: "API documentation for Delish Nutrio - a personalised Nutrition wesite",   
            contact: {
                name: "Jimmy",
                email: "jimmypraiseofficial@gmail.com",
            },
        },
        servers: [
            {
                url: "http://localhost:3000",   
            },
        ],
    },
    apis: ["../routes.js"], // Path to the API docs  
};  

const swaggerDocs = swaggerJsDoc(swaggerOptions);  
export default swaggerDocs;