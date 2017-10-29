const Router = require('koa-router');
const users = require('./users');
const records = require('./records');

const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = {
    message: 'Hello World',
  };
});

router.use('/users', users.routes());
router.use('/records', records.routes());

module.exports = router;
