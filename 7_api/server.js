const Koa = require('koa');
const Router = require('koa-router');
const body = require('koa-body');
const cors = require('@koa/cors');
const logger = require('koa-logger');
const mongoose = require('mongoose');
const Promise = require('bluebird');

// mongodb
mongoose.Promise = Promise;
const db = mongoose.createConnection('mongodb://localhost/test');
const Whistle = db.model('Whistle', new mongoose.Schema({ text: String }));

// router
const router = new Router();
router.get('/status', ctx => {
  ctx.body = { ok: true };
  ctx.status = 200;
});
router.get('/api/whistle', async ctx => {
  const items = await Whistle.find()
    .limit(500)
    .lean();
  ctx.body = items || [];
  ctx.status = 200;
});
router.post('/api/whistle', async ctx => {
  const item = await Whistle.create(ctx.request.body);
  ctx.body = { ok: true };
  ctx.status = 200;
});
router.delete('/api/whistle', async ctx => {
  await Whistle.deleteMany({});
  ctx.body = { ok: true };
  ctx.status = 200;
});

// server
const port = 1337;
const app = new Koa();
app.use(
  cors({
    origin: '*',
  })
);
app.use(logger());
app.use(body({ json: true }));
app.use(router.routes()).use(router.allowedMethods());
// start
app.listen(port, () => {
  console.log(`Szerver figyel ${port} porton`);
});
