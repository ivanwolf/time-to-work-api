const Router = require('koa-router');
const {
  errorHandler,
  paramsHandler,
  validateUser,
} = require('../middlewares');
const {ConflictError} = require('../utils/errors');
const recordQueries = require('../queries/records');

const router = new Router();

// Pedimos que user_id esté en el cuerpo del request
const requireUserId = paramsHandler({
  'user_id': {
    required: true,
    notEmpty: true,
  },
});

// Creamos ctx.state.user a partir del user_id enviado como parámetro
const setUser = validateUser('user_id');

const createRecord = async (ctx) => {
  const {user} = ctx.state;
  const record = await ctx.queries.createRecord(user.id);
  ctx.body = {
    data: record,
  };
  ctx.status = 201;
};

const fetchRecords = async (ctx) => {
  const {user} = ctx.state;
  const records = await ctx.queries.getRecords(user.id);
  ctx.body = {
    data: records,
  };
};

const markRecordAsCompleted = async (ctx) => {
  const record = await ctx.queries.getRecordById(ctx.params.id);
  if (record.completed) {
    throw new ConflictError('Record already completed');
  }
  const completed = await ctx.queries.completeRecord(ctx.params.id);
  ctx.body = {
    data: completed,
  };
};

router.use(errorHandler);
router.use(recordQueries);

router.post(
  '/',
  requireUserId,
  setUser,
  createRecord,
);

router.post(
  '/fetch',
  requireUserId,
  setUser,
  fetchRecords,
);

router.put(
  'completeRecord',
  '/:id',
  markRecordAsCompleted,
);

module.exports = router;
