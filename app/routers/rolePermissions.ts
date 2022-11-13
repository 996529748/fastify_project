import { FastifyInstance } from "fastify";
import { updateRolePermissions, getAllMember } from "../services/rolePermissions";

// 角色权限
const setupRolePermissionsRouter = (app:FastifyInstance) => {

  //设置角色权限
  app.post('/v1/user/rolePermissions',async (req,res)=>{
    //取出参数
    const userId = req.body as { userId: string };

    const ret = await updateRolePermissions(userId.userId);
        
    res.status(ret.code).send(ret);

  })

  //获取所有成员信息
  app.get('/v1/all/member/:userId', async(req,res)=>{
    //取出参数
    const userId = req.params as { userId: string };

    const ret = await getAllMember(userId.userId);
        
    res.status(ret.code).send(ret);

  })

}





export { setupRolePermissionsRouter }