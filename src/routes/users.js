const Router = require('koa-router');
const CustomError = require('../utils/CustomError');

const router = new Router();

router.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    if (error.status) {
      ctx.status = error.status;
      ctx.body = error.message;
    }
  }
});

router.get('showUser', '/:id', async (ctx) => {
  const user = await ctx.db.User.findById(ctx.params.id);
  if (user === null) {
    throw new CustomError('User not found', 404);
  } else {
    ctx.body = {
      data: user,
    };
  }
});

router.get('indexUsers', '/', async (ctx) => {
  try {
    const users = await ctx.db.User.findAll();
    ctx.body = {
      data: users,
    };
  } catch (err) {
    console.log(err);
  }
});




module.exports = router;
