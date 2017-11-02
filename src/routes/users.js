const Router = require('koa-router');
const {ConflictError} = require('../utils/errors');
const {
  errorHandler,
  paramsHandler,
  validateUser,
} = require('../middlewares');
const userQueries = require('../queries/users');

const router = new Router();

const requireUsername = paramsHandler({
  username:  {
    require: true,
    notEmpty: true,
  }
});


router.use(errorHandler);
router.use(userQueries);

router.get('indexUsers', '/', async (ctx) => {
  const users = await ctx.queries.getUsers();
  ctx.body = {
    data: users,
  };
});

router.get('showUser', '/:id', validateUser('id'), async (ctx) => {
  ctx.body = {
    data: ctx.state.user,
  };
});


router.post('createUser', '/', requireUsername, async (ctx) => {
  let user = await ctx.queries.getUserByUsername(ctx.params.username);
  if (user) {
    throw new ConflictError('User already exists');
  } else {
    user = await ctx.queries.createUser(ctx.params);
    ctx.status = 201;
    ctx.body = {
      data: user,
    };
  }
});




module.exports = router;
