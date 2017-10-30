const Koa = require('koa');
const logger = require('koa-logger');
const koaBody = require('koa-body');
const knex = require('./connection');
const routes = require('./routes');

const app = new Koa();
app.context.knex = knex;

if (process.env.NODE_ENV === 'development') {
  app.use(logger());
}

/* Set Content-Type */
app.use(async (ctx, next) => {
  ctx.res.type = 'application/json';
  await next();
});


app.use(koaBody());

app.use(routes.routes());

module.exports = app;

