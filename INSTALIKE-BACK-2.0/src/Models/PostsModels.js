
// O que é?: É onde você coloca os dados e a lógica de como interagir com o banco de dados.
// Exemplo: Se você tiver um site de usuários, o Model vai ser responsável por pegar, adicionar, editar e excluir usuários do banco de dados.
// Resumindo: A Model é o "cérebro" para gerenciar os dados.


import 'dotenv/config';
import conectarAoBanco from "../cfg/DBconfig.js";



export async function   criarNovoPost(novoPost){
    const dbConexao  = await conectarAoBanco();
    const {descricao, img_url, data_criacao} = novoPost;
    const query = "INSERT INTO posts (descricao, img_url, data_criacao) VALUES (?, ?, ?)";
    const parametros = [descricao, img_url, data_criacao || null];

    try {
        const [resultado] = await dbConexao.execute(query, parametros);
        console.log('Post inserido com sucesso!', resultado);
        return resultado; 
    } catch (erro) {
        console.erro('Erro ao inserir post: ', erro);
        throw erro;
    } finally {
        // Fecjar a coneção apos a operação
        await dbConexao.end();
        console.log('Conexão com DB fechada. ');
    }
};

export async function  pegarTodosPosts(pegandoTodosPosts) {
    const dbConexao  = await conectarAoBanco();
    const query = "SELECT * FROM posts";

    try {
        const [resultado] = await dbConexao.execute(query);
        console.log('Pego TODOS os posts com Sucesso!', resultado);
        return resultado; 
    } catch (erro) {
        console.erro('Erro ao pegar os posts: ', erro);
        throw erro;
    } finally {
        // Fecjar a coneção apos a operação
        await dbConexao.end();
        console.log('Conexão com DB fechada. ');
    }
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