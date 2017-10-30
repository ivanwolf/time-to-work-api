const Router = require('koa-router');
const {
  errorHandler,
  paramsHandler,
  setupUser,
} = require('../middlewares');
const recordQueries = require('../queries/records');
const userQueries = require('../queries/users');

const router = new Router();

router.use(errorHandler('record'));
router.use(paramsHandler({
  'user_id': {
    required: true,
    notEmpty: true,
  },
}));
router.use(recordQueries);
router.use(userQueries);
router.use(setupUser);


router.post('createRecord', '/', async (ctx) => {
  const record = await ctx.queries.createRecord(ctx.params.user_id);
  ctx.body = {
    record,
  };
});

router.post('indexRecords', '/fetch', async (ctx) => {
  console.log(ctx.params);
  const records = await ctx.queries.getRecords(ctx.params.user_id);
  ctx.body = {
    data: records,
  };
});

router.post('createRecord', '/', async (ctx) => {
  console.log(ctx.params);
});

module.exports = router;
