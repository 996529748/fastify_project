import { closeConnect, connectMongo } from "../utils/connect";
import { getUserInfo } from "./user";

//TODO:当前用户使用管理员ID设置权限时无法识别
//设置用户权限
const updateRolePermissions = async(userId:string):Promise<ResponseInfo<UserRolePermissions>>=> {

  const userInfo = getUserInfo(userId)
  const role = (await userInfo).data?.role

  //非管理员不可设置用户信息
  if(role !== 'admin'){
    return { code: 500, msg: "暂无权限！请联系管理员变更！" };
  }

  // 链接数据库
  const userDataSet = await (await connectMongo()).collection<UserRolePermissions>('users')
  const user = await userDataSet.findOne({ userId:userId });
  
  //是否存在此用户
  if (user) {
    // 设置用户角色
    //更新用户信息
    await userDataSet.updateOne(
      {
        userId: userId
      },
      {
        $set: userInfo
      }
    );
    await closeConnect();
    return { code: 200, msg: "用户角色设置成功！" };

  } else {

      return { code: 500, msg: "用户不存在！" };
  }
  
}

//获取所有成员列表
const getAllMember = async(userId:string) => {
  const userInfo = getUserInfo(userId)
  const role = (await userInfo).data?.role

  //非管理员不可获取成员列表
  if(role !== 'admin'){
    return { code: 500, msg: "暂无权限！" };
  }

  //管理获取成员列表
  //链接数据库
  const userDataSet = await (await connectMongo()).collection<UserRolePermissions>('users')
  const user = await userDataSet.find().toArray();

  return { code: 200, msg: "成功", data: user };

}



export { updateRolePermissions, getAllMember }