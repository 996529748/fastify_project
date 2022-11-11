import { connectMongo, closeConnect } from "../utils/connect";
import { ObjectId } from "mongodb";
import * as TokenService from "./token";

//注册
const register = async (data: UserRegisterCredentials): Promise<ResponseInfo<null>> => {
    // 链接数据库
    const userDataSet = await (await connectMongo()).collection<UserInfo>('users')

    //是否重名
    const exist = await userDataSet.findOne({
        username: data.username
    });

    //已存在
    if (exist) {
        return { code: 500, msg: "已存在同名用户" };
    }

    // 插入一条数据
    await userDataSet.insertOne({
        ...data,
        _id: `${new ObjectId()}`, // 生成唯一ID
        createTime: new Date().getTime().toString(),
        updateTime: new Date().getTime().toString()
    });

    // 关闭链接
    closeConnect();

    return { code: 200, msg: "成功" };
}

// 登录
const login = async (data: UserLoginCredentials): Promise<ResponseInfo<UserInfo & {token:string}>> => {

    const userDataSet = await (await connectMongo()).collection<UserInfo>("users");

    const user = await userDataSet.findOne({ ...data });

    await closeConnect(); // 找到用户结束操作

    //是否存在此用户
    if (user) {
        // 创建 or 更新该用户token
        const token = await TokenService.updateToken(user._id.toString());
        // 返回登录用户信息
        return { code: 200, msg: "成功", data: { ...user, token } };

    } else {

        return { code: 500, msg: "用户名或密码错误" };
    }

}

//获取用户信息
const getUserInfo = async (userId: string): Promise<ResponseInfo<UserInfo>> => {

    const userDataSet = await (await connectMongo()).collection<UserInfo>("users");

    //查找当前ID的用户信息
    const userInfo = await userDataSet.findOne({ _id: userId });

    await closeConnect();

    //判断是否存在用户信息
    if (userInfo) {
        return { code: 200, msg: "成功", data: userInfo };
    } else {
        return { code: 500, msg: "用户信息不存在" };
    }

}

//更新用户信息
const updateUserInfo = async (userId: string, data: OptionalUserRegisterCredentials): Promise<ResponseInfo<UserInfo>> => {
    //查找当前ID的用户信息
    const exist = await getUserInfo(userId);

    const userDataSet = await (await connectMongo()).collection<UserInfo>("users");

    //判断是否存在用户
    if (exist.code === 200) {
        //更新
        await userDataSet.updateOne(
            {
                _id: userId
            },
            {
                $set: data
            }
        );
        await closeConnect();
        return { code: 200, msg: "成功" };
    }else{
        return { code: 500, msg: "用户信息不存在" };
    }
}

export { register, login, getUserInfo, updateUserInfo };
