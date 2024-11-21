import { getAllPosts, createdPost, createdComent  } from "../Models/PostsModels.js";
import fs from "fs";

export async function listAllPosts(req, res) {
    const posts = await getAllPosts()
    res.status(200).json(posts);
}   

export async function publishNewPost(req, res) {
    const newPost = req.body;
    try {
        const postCreated = await createdPost(newPost) 
        res.status(200).json(postCreated);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"})
    }
}



export async function uploadImagem (req, res) {
    const newPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    }

    try {
        const postCreated = await createdPost(newPost);
        const imgAtualizada = `uploads/${postCreated.insertedId}.png`
        fs.renameSync(req.file.path, imgAtualizada);
        res.status(200).json(postCreated);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"})
    }
}

export async function uploadComentario(req, res) {
    const newComent = {
        autor: req.body.autor,        // Obtém o nome do autor do corpo da requisição
        comentario: req.body.comentario,  // Obtém o comentário do corpo da requisição
    };

    try {
        // Insere o comentário no banco de dados
        const comentCreated = await createdComent(newComent);
        res.status(200).json(comentCreated);  // Retorna o comentário criado
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({"Erro": "Falha na requisição"});  // Em caso de erro, retorna erro 500
    }
}


