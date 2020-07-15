const Koa = require('koa');
const cors = require('@koa/cors')
const koaBody = require('koa-body');
const Router = require('koa-router');

const router = new Router();
const app = new Koa();

router.post('/api/user',async ctx => {
  let {body,header} = ctx.request;
  if(!body.name || !body.email){
    ctx.body = {
      code:'500',
      msg:"name和email不得为空"
    }
    return
  }else if(!header.admin && header.role != 'admin'){
    ctx.body = {
      code:'401',
      msg:"unauthorizedpost"
    }
  }else{
    ctx.body = {
      code:200,
      data:{
        name:body.name,
        email:body.email
      },
      msg:'请求成功'
    }
  }
})

app.use(koaBody())
app.use(cors())
app.use(router.routes())
  .use(router.allowedMethods())

app.listen(3000);