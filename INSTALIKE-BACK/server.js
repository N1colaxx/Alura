import express from "express";

const posts = [
    { id: 1, description: "Uma", img: "https://placecats.com/millie/300/150" },
    { id: 2, description: "Gato no jardim", img: "https://placecats.com/millie/300/150" },
    { id: 3, description: "Gato dormindo", img: "https://placecats.com/millie/300/150" },
    { id: 4, description: "Gato curioso", img: "https://placecats.com/millie/300/150" },
    { id: 5, description: "Gato brincando", img: "https://placecats.com/millie/300/150" },
    { id: 6, description: "Gato comendo", img: "https://placecats.com/millie/300/150" },
];

//          express -> é uma função
const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log("Servidor escutando... ");
});



// --------------------------------------------------------------- 

function buscaPostPorID(id) {
    return posts.findIndex((post) => {
        return post.id === Number(id)
    });
};

function buscaPorDescription(description){
    return posts.findIndex((post) => {
        return post.description.toLowerCase() === description.toLowerCase() // tolLowerCase = vai aceitar letras maiúsculas ou minúsculas
    });
};


// ---------------------------------------------------------------


// app.get("/posts", (req, res) => {
//     res.status(200).json(posts);
// });  SE estiver usando o modo de requiscão QUERY essa parte tem q ficar comitado para n dar duplicidade nas rotas /posts



// Aqui A busca é feita diretamente utilizando o valor inserido no parâmetro da URL, pegando o 1 res.
// app.get("/posts/search/:search", (req, res) => {
//     const index = buscaPorDescription(req.params.search)
//     if ( index !== -1) {
//         res.status(200).json(posts[index])
//     } else {
//         res.status(404).json({message: "Foto não encontrada"})
//     } 
// });



//  Com o parametro QUERY, permite criar rotas mais flexíveis e dinâmicas em uma API. podendo delimitar o modo de pesquisa, ex: descrição, autor, etx. Definir a quantidade de res. Entre outros.
//  Exemplos de URLs com múltiplos parâmetros:
//  posts?descricao=gato&limit=3, pesquisa pela descriçao e limitados a 3 resultados.


app.get("/posts", (req, res) => {
    const descricao = req.query.descricao; // req.query para obter parâmetro de descrição
    const limit = req.query.limit; // Define o limite de resultados

    // Filtra os posts pela descrição, se houver esse parâmetro
    const filteredPosts = posts.filter(post => {
        return descricao ? post.description.toLowerCase().includes(descricao.toLowerCase()) : true;
    });

    // Limita a quantidade de posts retornados, se o parâmetro 'limit' for informado
    const limitedPosts = limit ? filteredPosts.slice(0, Number(limit)) : filteredPosts;

    if (limitedPosts.length > 0) {
        res.status(200).json(limitedPosts);
    } else {
        res.status(404).json({ message: "Foto não encontrada" });
    } 
});


app.get("/posts/:id", (req, res) => {
    const index = buscaPostPorID(req.params.id)
    if (index !== -1) { // quando faz uma consulta e n enconta o que foi pesquisado o RES é -1, assim dando o erro 404.
        res.status(200).json(posts[index]);
    } else {
        res.status(404).json({message:"Id não encontrado"})
    }
});
