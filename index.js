const Koa = require('koa');
const request = require('koa2-request');
const app = new Koa();

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(async ctx => {
  const shortUrl = ctx.request.query && ctx.request.query.url;

  if (shortUrl) {
    const response = await request(shortUrl, {
      followRedirect: false
    });
    ctx.body = response.headers.location;
  } else {
    ctx.body = 'Hello from koa.js!';
  }
});

// app.listen(8080);

module.exports = app.callback();
