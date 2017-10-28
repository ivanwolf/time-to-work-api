const Router = require('koa-router');
const router = new Router({
  prefix: '/api/v1/'
});
const users = require('./users');

router.get('/', async (ctx) => {
  ctx.body = {
    message: 'Hello World',
  };
});

router.use(users.routes());

module.exports = router;
