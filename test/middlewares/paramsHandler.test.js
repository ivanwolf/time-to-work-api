const {
  chai,
  should,
} = require('../setup');
const paramsHandler = require('../../src/middlewares/paramsHandler');
const {
  MissingParameterError,
  ValidationError,
} = require('../../src/utils/errors');


describe('middlewares : paramsHandler', () => {
  const middleware = paramsHandler({
    'user_id': {
      required: true,
      notEmpty: true,
    }
  });
  const setContext = (body) => ({
    request: {
      body,
    }
  });
  const next = () => {};

  it('should add the parsed params as a property to ctx', () => {
    const ctx = setContext({
      key: 'value',
      'user_id': 4,
    });
    chai
      .expect(() => {
        middleware(ctx, next);
      }).not.to.throw();
    should.exist(ctx.params);
    should.exist(ctx.params.user_id);
    should.not.exist(ctx.params.key);
    ctx.params.user_id
      .should.be
      .equal(ctx.request.body.user_id);
  });

  it('should raise error when user_id is not present', async () => {
    const ctx = setContext({
      key: 4,
    });
    try {
      await middleware(ctx, next);
    } catch (error) {
      error.should.be.an.instanceof(MissingParameterError);
    }
  });

  it('should raise error when user_id is empty', async () => {
    const ctx = setContext({
      'user_id': '',
    });
    try {
      await middleware(ctx, next);
    } catch (error) {
      error.should.be.an.instanceof(ValidationError);
    }
  });
});
