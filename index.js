const putenv = require('putenv')
const parse = require('co-body')
const getEnvVar = require('zeelib/lib/get-env-var')
const getEnv = () => process.env

module.exports = (prefix) =>
  async (ctx, next) => {
    ctx.type = 'application/json'
    switch (ctx.request.method) {
      case 'GET':
        const envVar = ctx.request.path.replace(prefix, '').replace(/^\//, '')
        if (envVar) {
          ctx.body = JSON.stringify(getEnvVar(envVar))
        } else {
          ctx.body = JSON.stringify(getEnv())
        }
        return next()
      case 'POST':
        const kv = await parse.json(ctx)
        Object.keys(kv).forEach((k) => {
          putenv(k, kv[k])
        })
        ctx.body = null
        return next()
      default:
        ctx.body = null
        return next()
    }
  }
