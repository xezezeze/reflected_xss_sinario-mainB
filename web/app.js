const express = require('express');
const app = express();
const PORT = 3000;

const suspiciousPattern = /<script.*?>|%3Cscript/i;

app.use((req, res, next) => {
  const qs = JSON.stringify(req.query);
  if (suspiciousPattern.test(qs)) {
    console.log("==== XSS DETECTED ====");
    console.log("IP:", req.ip);
    console.log("Payload:", qs);
    console.log("======================");
  }
  next();
});


app.use(express.static('public'));

// 레이아웃
function layout(title, body) {
  return `
  <!doctype html>
  <html lang="ko">
  <head>
    <meta charset="utf-8" />
    <title>${title}</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <h1>Reflected XSS Simulation</h1>
    <hr />
    ${body}
    <footer>
      <p class="project-info">
        Web Security Project – Reflected XSS Demo
      </p>
      <p class="github-link">
        🔗 <a href="https://github.com/nongdam/reflected_xss_sinario" target="_blank">GitHub Repository</a>
      </p>
    </footer>
  </body>
  </html>
  `;
}

app.locals.layout = layout;

const searchRouter = require('./routes/home');

app.use('/', searchRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
