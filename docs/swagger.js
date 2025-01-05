import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Delish Nutrio ',
    description: 'This is the API documentation for Delish Nutrio',
  },
  host: 'delish-nutrio.onrender.com'
};

const outputFile = './swagger-output.json';
const routes = ['../src/app.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen()(outputFile, routes, doc).then(async () => {
  await import ('../src/app.js');
});;