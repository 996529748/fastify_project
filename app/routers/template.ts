import { FastifyInstance } from "fastify";
import { addTemplate,deleteTemplate } from "../services/template";

const setupTemplateRouter = ( app:FastifyInstance ) => {
    //添加模板
    app.post('/v1/add/template',async(req,res)=>{
        //取出参数
        const data = req.body as TemplateParams;

        //操作数据库插入
        const ret = await addTemplate(data);
        
        // 请求成功返回
        res.status(ret.code).send({ret});
    })

    //删除模板
    app.delete('/v1/delete/template/:templateId',async(req,res)=>{
        //取出参数
        const templateId = req.params as { templateId: string };

        //操作数据库删除
        const ret = await deleteTemplate(templateId.templateId);

        // 请求成功返回
        res.status(ret.code).send({ret});

    })
}

export { setupTemplateRouter }