const Router = require('koa-router');
const {
  NotFoundError,
  ValidationError,
  ConflictError,
} = require('../utils/errors');
const {errorHandler} = require('../middlewares');
const userQueries = require('../queries/users');
const parseBody = require('../utils/parseBody');

const router = new Router();

router.use(errorHandler('User'));
router.use(userQueries);

router.get('indexUsers', '/', async (ctx) => {
  const users = await ctx.queries.getUsers();
  ctx.body = {
    data: users,
  };
});

router.get('showUser', '/:id', async (ctx) => {
  const user = await ctx.queries.getUserById(ctx.params.id);
  if (user === undefined) {
    throw new NotFoundError();
  }
  ctx.body = {
    data: user,
  };
});


router.post('createUser', '/', async (ctx) => {
  const params = parseBody(ctx.request.body, [
    'username',
  ]);
  if (params.username === '') {
    throw new ValidationError('username');
  }
  let user = await ctx.queries.getUserByUsername(params.username);
  if (user) {
    throw new ConflictError('username');
  } else {
    user = await ctx.queries.createUser(params);
    ctx.status = 201;
    ctx.body = {
      data: user,
    };
  }
});




module.exports = router;
