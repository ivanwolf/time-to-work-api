const Router = require('koa-router');
const {
  errorHandler,
  paramsHandler,
  validateUser,
} = require('../middlewares');
const {ConflictError} = require('../utils/errors');
const recordQueries = require('../queries/records');
const userQueries = require('../queries/users');

const router = new Router();

router.use(errorHandler);
router.use(paramsHandler({
  'user_id': {
    required: true,
    notEmpty: true,
  },
}));
router.use(recordQueries);
router.use(userQueries);
router.use(validateUser('user_id'));


router.post('createRecord', '/', async (ctx) => {
  const record = await ctx.queries.createRecord(ctx.params.user_id);
  ctx.body = {
    record,
  };
});

router.post('indexRecords', '/fetch', async (ctx) => {
  const records = await ctx.queries.getRecords(ctx.params.user_id);
  ctx.body = {
    data: records,
  };
});

router.put('completeRecord', '/:id', async (ctx) => {
  const record = await ctx.queries.getRecordById(ctx.params.id);
  if (record.completed) {
    throw new ConflictError('Record already completed');
  }
  const completed = await ctx.queries.completeRecord(ctx.params.id);
  ctx.body = {
    data: completed,
  };
});

module.exports = router;
