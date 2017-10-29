const Router = require('koa-router');
const NotFoundError = require('../utils/notFoundError');
const errorHandler = require('../utils/errorHandler');
const parseBody = require('../utils/parseBody');

const router = new Router();

router.use(errorHandler('Record'));

router.get('indexRecords', '/', async (ctx) => {
  const records = await ctx.db.Record.findAll();
  ctx.body = {
    data: records,
  };
});

router.post('createRecord', '/', async (ctx) => {
  console.log(ctx.request.body);
  const params = parseBody(ctx.request.body, [
    'user_id',
  ]);
  console.log(params);
});

module.exports = router;
