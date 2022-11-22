import { FastifyInstance } from "fastify";
import Joi from "joi";//效验
// import { validationPassword } from "../utils/rsa";
import * as UserService from "../services/user";

// 用户注册参数校验
const UserRegisterValidate = Joi.object<UserRegisterCredentials>({
    username: Joi.string().min(2).max(16).required(),
    password: Joi.string().min(6).required(),
    sex:Joi.allow(0,1)
});

// 登录参数校验
const UserLoginValidate = Joi.object<UserLoginCredentials>({
    username: Joi.string().min(2).max(16).required(),
    password: Joi.string().min(6).required()
});

//效验ID
const BaseIdValidate = Joi.string().length(24).required();

const setupUserRouter = (app:FastifyInstance) => {

    //用户注册
    app.post("/v1/user/register",async (req, res) => {

        const data = req.body as UserRegisterCredentials;
        //参数效验
        const result = UserRegisterValidate.validate(data);

        // const  checkoutPassword = validationPassword(data.password)

        //验证密码是否rsa加密
        // console.log(checkoutPassword)

        //错误抛出
        if (result.error) {
            res.status(500).send({ msg: result.error, code: 500 });
            return;
        }

        //操作数据库插入
        const ret = await UserService.register(req.body as UserRegisterCredentials);

        // 请求成功返回
        res.status(ret.code).send({ret});
    })


    //用户登录
    app.post("/v1/user/login",async (req, res) => {

        const data = req.body as UserLoginCredentials;

        const result = UserLoginValidate.validate(data);

        //错误抛出
        if (result.error) {
            res.status(500).send({ msg: result.error, code: 500 });
            return;
        }

        //操作数据库插入
        const ret = await UserService.login(data);

        // 请求成功返回
        res.status(ret.code).send({ret});
    })

    
    //获取用户信息
    app.get("/v1/user/:id",async (req, res) => {
        const params = req.params as { id: string };
        const id = params.id;
        const result = BaseIdValidate.validate(id);

        //错误
        if (result.error) {
            res.status(500).send({ msg: result.error, code: 500 });
            return;
        }

        const ret = await UserService.getUserInfo(id);

        res.status(ret.code).send({ code: ret.code, data: ret });

    })

    //更新用户信息
    app.put("/v1/user/:userId", async (req, res) => {

        const data = req.body as OptionalUserRegisterCredentials;

        const result = UserRegisterValidate.validate(data);
        const params = req.params as { userId: string };
        
        if (result.error) {
          res.status(500).send({ msg: result.error, code: 500 });
          return;
        }

        const ret = await UserService.updateUserInfo(params.userId, data);
        
        res.status(ret.code).send(ret);
    });

    //用户注销
    app.delete("/v1/user/cancellation/:userId",async (req, res)=>{
        //获取用户ID
        const params = req.params as { userId: string };
        console.log(params.userId)
        //操作数据库删除
        const ret = await UserService.deleteUserInfo(params.userId);

        res.status(ret.code).send(ret);
    })

}

export { setupUserRouter }