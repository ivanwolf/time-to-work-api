const Router = require('koa-router');
const {
  NotFoundError,
  ValidationError,
  ConflictError,
  MissingParameterError,
} = require('../utils/errors');
const {errorHandler} = require('../middlewares');
const recordQueries = require('../queries/records');
const parseBody = require('../utils/parseBody');

const router = new Router();

router.use(errorHandler('Record'));
router.use(recordQueries);

router.post('indexRecords', '/', async (ctx) => {
  const params = parseBody(ctx.request.body, [
    'user_id',
  ]);
  if (params.user_id === undefined) {
    throw new MissingParameterError('user_id');
  }
  if (params.user_id === '') {
    throw new ValidationError('user_id');
  }
  const records = await ctx.queries.getRecords(params.user_id);
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
