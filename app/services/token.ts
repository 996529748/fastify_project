import { closeConnect, connectMongo } from "../utils/connect";
// https://github.com/auth0/node-jsonwebtoken
import jwt from "jsonwebtoken";
import { privateKey } from "../config/RSA";

//更新token,新用户则新建token
const updateToken = async (userId: string) => {
    // 签名-获取新的token
    const newToken = jwt.sign(
        {
            _id: userId
        },
        privateKey,
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

export { updateToken }