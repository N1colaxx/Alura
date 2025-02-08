

// controller
//      O que é?: É o "intermediário" entre o Model (dados) e a View (interface). O Controller recebe as ações do usuário e decide o que fazer com elas.
//      Exemplo: Se o usuário clicar em um botão para cadastrar um novo usuário, o Controller vai pegar esses dados, enviar para o Model salvar no banco de dados, e depois pode    atualizar a View para mostrar uma confirmação.
//      Resumindo: O Controller "controla" o fluxo entre os dados e o que o usuário vê.


import { getAllPosts, createdPost, updatePost} from "../Models/PostsModels.js";
import fs, { accessSync } from "fs";
import { error } from "console";
import gerarDescricaoComGemini from "../services/geminiServeci.js"

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
    };

    try {
        const postCreated = await createdPost(newPost);
        const imgAtualizada = `uploads/${ postCreated.insertedId }.png`
        fs.renameSync(req.file.path, imgAtualizada)
        res.status(200).json(postCreated);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"})
    }
}

// export async function uploadComentario(req, res) {
//     const newComent = {
//         autor: req.body.autor,        // Obtém o nome do autor do corpo da requisição
//         comentario: req.body.comentario,  // Obtém o comentário do corpo da requisição
//     };

//     try {
//         // Insere o comentário no banco de dados
//         const comentCreated = await createdComent(newComent);
//         res.status(200).json(comentCreated);  // Retorna o comentário criado
//     } catch (erro) {
//         console.error(erro.message);
//         res.status(500).json({"Erro": "Falha na requisição"});  // Em caso de erro, retorna erro 500
//     }
// }

// // export async function buscaPostPorID(req, res) {
// //     try {
// //         const idDoPost = req.params;
// //         const postDoId = await getPostDoID.findById(idDoPost);

// //         if (!postDoId) {
// //             res.status(404).json({message: "Post não encontrado!"});
// //         } else {
// //             res.status(200).json(postDoId);
// //         }
// //     }  catch (erro) {
// //         console.error(erro.message);
// //         res.status(500).json({"Erro":"falha na requisição!"});
// //     }
// // }

// // export async function buscaTapyQuery(req, res) {
// //     try {
// //         const descricao = req.query.descricao || ''; // Obtém a descrição da query string
// //         const limit = req.query.limit ? parseInt(req.query.limit, 10) : 0; // Limite de resultados

// //         // Consulta no banco de dados com filtro de descrição (case-insensitive)
// //         const query = descricao
// //             ? { description: { $regex: `.*${descricao}.*`, $options: 'i' }} // Regex case-insensitive
// //             : {};

// //         // Realiza a consulta usando o modelo getDoTipoQuery
// //         const filteredPosts = await getDoTipoQuery.find(query).limit(limit);

// //         // Verifica se encontrou algum post
// //         if (filteredPosts.length > 0) {
// //             return res.status(200).json(filteredPosts); // Retorna os posts encontrados
// //         } else {
// //             return res.status(404).json({ message: "Nenhum post encontrado" }); // Caso não encontre
// //         }
// //     } catch (erro) {
// //         console.error("Erro na busca:", erro.message);
// //         return res.status(500).json({ message: "Erro ao buscar no banco de dados" }); // Erro no servidor
// //     }
// // }


export async function updateNewPost(req, res) {
    const id = req.params.id;
    const urlImg =`http://localhost:3000/${id}.png`;

    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imgBuffer);

        const post = {
            imgUrl: urlImg,
            descricao: descricao,
            alt: req.body.alt
        } ;

        const postCreated = await updatePost(id, post) ;
        res.status(200).json(postCreated);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"})
    }
}