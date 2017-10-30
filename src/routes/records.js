const Router = require('koa-router');
const {errorHandler} = require('../middlewares');
const parseBody = require('../utils/parseBody');

const router = new Router();

router.use(errorHandler('Record'));

router.get('indexRecords', '/', async (ctx) => {
  const records = await ctx.db.Record.query();
  ctx.body = {
    data: records,
  };
});

router.post('createRecord', '/', async (ctx) => {
  const params = parseBody(ctx.request.body, [
    'user_id',
  ]);

  console.log(params);
});

module.exports = router;
