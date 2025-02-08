import express from "express"; // Framework para criar o servidor web
import conectarAoBanco from "./src/cfg/DBconfig.js";
import routes from "./src/routes/PostsRoutes.js";


const app = express();
app.use(express.static("uploads")) // Permite servir arquivos estáticos da pasta uploads, como imagens.
routes(app) // Ativa as rotas definidas no arquivo PostsRoutes.js.

// app.listen(3000) ==> Inicia o servidor na porta 3000.
app.listen(3000, () => {
    console.log("Servidor escutando... ");
});


// --------------------------------------------------------------- 

// function buscaPostPorID(id) {
//     return posts.findIndex((post) => {
//         return post.id === Number(id)
//     });
// };

// function buscaPorDescription(description){
//     return posts.findIndex((post) => {
//         return post.description.toLowerCase() === description.toLowerCase() // tolLowerCase = vai aceitar letras maiúsculas ou minúsculas
//     });
// };



// ---------------------------------------------------------------
