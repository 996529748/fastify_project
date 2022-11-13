import fastify from "fastify";
import { setupBaseRouter } from "./routers/main";
import { setupUserRouter } from "./routers/user";
import { setupRolePermissionsRouter } from "./routers/rolePermissions";

// 加载框架并新建实例
const app = fastify({logger: true})


// 启动服务！
app.listen({port:9000,host:"0.0.0.0"}, (err, address) => {
    if (err) {
        console.log('服务启动失败：');
        console.log(err);
    }
    console.log(`服务启动成功：${address}...`);
})

//base
setupBaseRouter(app)
//用户信息
setupUserRouter(app)
//角色权限
setupRolePermissionsRouter(app)