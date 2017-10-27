const koa = require('koa');
const app = new koa();

app.use(async (ctx) => {
  ctx.body = 'Hello World';
});

module.exports = app;

