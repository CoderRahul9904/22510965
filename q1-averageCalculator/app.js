const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/calculate-average') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const data = JSON.parse(body);

        if (!Array.isArray(data.numAverage)) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ error: "'numb' must be an array" }));
        }

        const numAverage = data.numAverage;

        if (numAverage.length === 0) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ error: "'numAverage' array is empty" }));
        }

        const sum = numAverage.reduce((acc, num) => acc + num, 0);
        const average = sum / numAverage.length;

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ average }));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON input' }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Route not found' }));
  }
});


const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
