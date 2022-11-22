import { FastifyInstance } from "fastify";
import jwt from "jsonwebtoken";
import { findTokenFromDB } from "../services/token";
import { RequestHeaderToken, VerifyURL } from "../config/constant";
import { Config } from "../config/index";
// import * as TokenService from "../services/token";

//主入口
const setupBaseRouter = (app: FastifyInstance) => {
  /**

  *“onRequest”是请求生命周期中要执行的第一个钩子。没有前一个挂钩，下一个挂钩将是“preParsing”。

  *注意：在“onRequest”挂钩中，请求。body将始终为空，因为body解析发生在“preHandler”挂钩之前。

  */
  app.addHook("onRequest", (req, res, done) => {
    //让options预检请求快速结束
    if (req.method.toLowerCase() == "options") res.send(200);
    done();
  });


  // token校验是否过期
  app.addHook("onRequest", async (req, res) => {
    
    const url = req.url.split("?")[0];

    const token = req.headers[RequestHeaderToken];

    // 检查当前路由
    if (VerifyURL(url, req.method)) {
      return Promise.resolve({ data: "触发" });
    }

    // 拦截token错误的请求
    if (!token) {
      return res.status(401).send({ msg: "未携带token或token参数名错误", code: 401 });
    }else{
      if(token == "null" || typeof token !== "string"){
        return res.status(401).send({ msg: "请携带token请求", code: 401 });
      }
    }

    //携带token的请求处理
    const data = jwt.decode(token) as UserTokenInfo;
    if (!data) {
      res.status(401).send({ msg: "token不存在或已过期", code: 401 });
      return;
    }

    // 查询数据库中是否存在这条数据
    const lib_token = await findTokenFromDB({
      userId: data._id,
      assess_token: token
    });
    //不存在
    if (!lib_token) {
      res.status(401).send({ msg: "token不存在或已过期", code: 401 });
      return;
    }
    //存在
    return jwt.verify(
      lib_token.assess_token,
      Config.AssessTokenKey,
      async (err: unknown) => {
        if (err) {
          // token过期
          res.status(401).send({ msg: "token不存在或已过期", code: 401 });
          return;
        } 
        // else {
        //   await TokenService.updateToken(data._id);
        //   return;
        // }
      }
    );

  });
}

export { setupBaseRouter }