/* eslint-disable @typescript-eslint/no-require-imports */
const handler = require('serve-handler');
const http = require('http');

const server = http.createServer((request, response) => {
  return handler(request, response);
});

server.listen(8080, "127.0.0.1", () => {
    console.log(`Server running at http://127.0.0.1:8080`);
});
