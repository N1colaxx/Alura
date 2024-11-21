import conectarAoBanco from "../cfg/DBconfig.js";

const conexao = await conectarAoBanco(process.env.STRING_CONNECTION);


export async function  getAllPosts(pegandoTodosPosts) {
    const db = conexao.db("imersao-instabytes")
    const colecao = db.collection("posts")
    return colecao.find().toArray()
}

export async function createdPost(novoPost){
    const db = conexao.db("imersao-instabytes")
    const colecao = db.collection("posts")
    return colecao.insertOne(novoPost)
}

export async function createdComent(novoPost){
    const db = conexao.db("imersao-instabytes")
    const colecao = db.collection("coments")
    return colecao.insertOne(novoPost)
}


