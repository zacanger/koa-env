const tape = require('tape')
const http = require('http')
const request = require('supertest')
const Koa = require('koa')
const env = require('.')

tape.test('get all', (t) => {
  const app = new Koa()
  app.use(env('/env'))
  const server = http.createServer(app.callback())
  request(server)
    .get('/env')
    .expect(200, (err, res) => {
      if (err) {
        throw err
      }
      t.equal(typeof res, 'object', 'res is an object')
      t.end()
    })
})

tape.test('get one', (t) => {
  process.env.__KOA_ENV_TESTING = 'koa-env-testing'
  const app = new Koa()
  app.use(env('/env'))
  const server = http.createServer(app.callback())
  request(server)
    .get('/env/__KOA_ENV_TESTING')
    .expect(200, (err, res) => {
      if (err) {
        throw err
      }
      t.equal(res.body, 'koa-env-testing', 'get one key')
      t.end()
    })
})

tape.test('post', (t) => {
  const app = new Koa()
  app.use(env('/env'))
  const server = http.createServer(app.callback())
  request(server)
    .post('/env')
    .send({ foo_bar_baz: 'foo-bar-baz' })
    .expect(200, () => {
      t.equal(process.env.foo_bar_baz, 'foo-bar-baz', 'post key')
      t.end()
    })
})

tape.test('post several', (t) => {
  const app = new Koa()
  app.use(env('/env'))
  const server = http.createServer(app.callback())
  request(server)
    .post('/env')
    .send({ foo_bar_baz: 'foo-bar-baz', asdf_whatever: 'asdf-whatever' })
    .expect(200, () => {
      t.equal(process.env.foo_bar_baz, 'foo-bar-baz', 'post several 1')
      t.equal(process.env.asdf_whatever, 'asdf-whatever', 'post several 2')
      t.end()
    })
})
