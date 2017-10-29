const Router = require('koa-router');
const NotFoundError = require('../utils/notFoundError');
const errorHandler = require('../utils/errorHandler');

const router = new Router();

router.use(errorHandler('User'));

router.get('indexUsers', '/', async (ctx) => {
  const users = await ctx.db.User.findAll();
  ctx.body = {
    data: users,
  };
});

router.get('showUser', '/:id', async (ctx) => {
  const user = await ctx.db.User.findById(ctx.params.id);
  if (user === null) {
    throw new NotFoundError();
  } else {
    ctx.body = {
      data: user,
    };
  }
});


router.post('createUser', '/', async (ctx) => {
  const user = await ctx.db.User.create(ctx.request.body);
  ctx.status = 201;
  ctx.body = {
    data: user,
  };
});




module.exports = router;
