import conectarAoBanco from "../cfg/DBconfig.js";

const conexao = await conectarAoBanco(process.env.STRING_CONNECTION);


export default async function  getTodosPosts() {
    const db = conexao.db("imersao-instabytes")
    const colecao = db.collection("posts")
    return colecao.find().toArray()
}
