# koa-env

Koa middleware for getting and setting environment variables.

--------

## Installation

`npm i koa-env`

## Usage

```javascript
const Koa = require('koa')
const app = new Koa()

app.use(koaEnv('/env-route'))

app.listen(8080)
```

```
GET /env-route/foo // => process.env.foo
GET /env-route // => process.env
POST /env-route -d '{"foo": "bar"}' // => process.env.foo = bar
```

## License

[MIT](./LICENSE.md)
