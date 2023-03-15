import fastify from "fastify";
import multipart from "@fastify/multipart";
import cors from "@fastify/cors";
import { setupBaseRouter } from "./routers/main";
import { setupUserRouter } from "./routers/user";
import { setupRolePermissionsRouter } from "./routers/rolePermissions";
import {setupTemplateRouter} from "./routers/template";

// 加载框架并新建实例
const app = fastify({logger: true}).register(multipart, {})
.register(cors, {
  allowedHeaders: "Content-Type,authorization",
  origin: "*"
});



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
//模板管理
setupTemplateRouter(app)