import { connectMongo, closeConnect } from "../utils/connect";
import { ObjectId } from "mongodb";

const addTemplate = async (data:TemplateParams):Promise<ResponseInfo<null>> => {
    //链接数据库
    const templateDataSet = await (await connectMongo()).collection<TemplateInfo>('templates')

    // 插入一条模板数据
    await templateDataSet.insertOne({
        ...data,
        templateId: `${new ObjectId()}`, // 生成唯一templateID
        createTime: new Date().getTime().toString(),
        updateTime: new Date().getTime().toString(),
    });

    // 关闭链接
    closeConnect();

    return { code: 200, msg: "模板添加成功！" };
}


const deleteTemplate = async (templateId:string):Promise<ResponseInfo<null>> => {
    //链接数据库
    const templateDataSet = await (await connectMongo()).collection<TemplateInfo>('templates')
    //模板id是否存在
    const exist = await templateDataSet.findOne({ templateId: templateId });
    
    if(!exist){
        return { code: 500, msg: "模板不存在！" };
    }else{
        //删除一条数据
        await templateDataSet.deleteOne({ templateId: templateId })

        // 关闭链接
        closeConnect();

        return { code: 200, msg: "模板删除成功！" };
    }
    
}

export { addTemplate,deleteTemplate }