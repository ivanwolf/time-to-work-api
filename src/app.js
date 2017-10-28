const Koa = require('koa');
const logger = require('koa-logger');
const db = require('./models');
const routes = require('./routes');

const app = new Koa();
app.context.db = db;

if (process.env.NODE_ENV === 'development') {
  app.use(logger());
}

app.use(async (ctx, next) => {
  await next();
  ctx.res.type = 'application/json';
});

app.use(routes.routes());

module.exports = app;

