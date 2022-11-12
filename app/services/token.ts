import { closeConnect, connectMongo } from "../utils/connect";
// https://github.com/auth0/node-jsonwebtoken
import jwt from "jsonwebtoken";
import { Config } from "../config/index";

//更新token,新用户则新建token
const updateToken = async (userId: string) => {
    // token秘钥生成 -- 获取新的token 
    // jwt.sign(需要加密的数据，加密密文（越乱越好），expiresIn 有效期)
    const newToken = jwt.sign(
        {
            _id: userId
        },
        Config.AssessTokenKey,
        {
            expiresIn: "1h",
        }
    );

    //根据userId生成token
    const tokenDataSet = await (await connectMongo()).collection('tokens');

    //token是否已存在
    const exist = await tokenDataSet.findOne({ userId: userId });

    if (exist) {
        const refreshData: Record<'assess_token', string> = {assess_token: newToken};
        // 更新token
        await tokenDataSet.updateOne(
            {
                userId: userId
            },
            {
                $set: refreshData
            }
        );
    } else {
        // 插入一条新的token
        await tokenDataSet.insertOne({
            userId: userId,
            assess_token: newToken
        })
    }

    //  关闭数据库链接
    await closeConnect();

    return newToken;

}

/** 获取数据库中存储的token信息 */
const findTokenFromDB =  async (params: TokenSearchParams) => {

  const tokenDataSet = await (await connectMongo()).collection<ConnectToken>('tokens');

  const lib_token = await tokenDataSet.findOne(params);

  await closeConnect();

  return lib_token;
}

export { updateToken,findTokenFromDB }