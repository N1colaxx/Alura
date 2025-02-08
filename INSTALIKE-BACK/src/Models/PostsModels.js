
// O que é?: É onde você coloca os dados e a lógica de como interagir com o banco de dados.
// Exemplo: Se você tiver um site de usuários, o Model vai ser responsável por pegar, adicionar, editar e excluir usuários do banco de dados.
// Resumindo: A Model é o "cérebro" para gerenciar os dados.


import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../cfg/DBconfig.js";

const conexao = await conectarAoBanco(process.env.STRING_CONNECTION);


export async function  getAllPosts(pegandoTodosPosts) {
    const db = conexao.db("imersao-instabytes")
    const colecao = db.collection("posts")
    return colecao.find().toArray()
}

export async function   createdPost(novoPost){
    const db = conexao.db("imersao-instabytes")
    const colecao = db.collection("posts")
    return colecao.insertOne(novoPost)
}

// export async function createdComent(novoComentario){
//     const db = conexao.db("imersao-instabytes")
//     const colecao = db.collection("coments")
//     return colecao.insertOne(novoComentario)
// }

// export async function getPostDoID(pegandoPostPeloID){
//     const db = conexao.db("imersao-instabytes")
//     const colecao = db.collection("coments")
//     return colecao.insertOne(pegandoPostPeloID)
// }


// import mongoose from 'mongoose';


// // Definindo o esquema do Post
// const postSchema = new mongoose.Schema({
//     description: { type: String, required: true },
//     imgURL: { type: String, required: true },
// });

// // Criando o modelo
// const Post = mongoose.model('Post', postSchema);

// // Função para buscar posts com base em uma query
// export async function getDoTipoQuery(buscaPorQuery) {
//     const db = conexao.db("imersao-instabytes");
//     const colecao = db.collection("posts");
//     return colecao.find(buscaPorQuery).toArray();
// }

// export default Post;

export async function updatePost(id, novoPost){
    const db = conexao.db("imersao-instabytes")
    const colecao = db.collection("posts")
    const objID = ObjectId.createFromHexString(id)
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost} )
}