import { MongoClient,Db } from "mongodb";
// 链接数据库
const url = "mongodb://127.0.0.1:27017";

const client = new MongoClient(url);

const connectMongo = (): Promise<Db> => {
    return new Promise((resolve, reject) => {
        client.connect().then((db) => {
            resolve(db.db('fastify_demo'))
        }).catch((err) => {
            console.log('链接失败')
            reject(err)
        });
    })
}

const closeConnect = async () => {
    console.log('关闭链接')
    await client.close();
    console.log('关闭链接2')
    return Promise.resolve();
};

export { connectMongo, closeConnect }