import express from "express";
import conectarAoBanco from "./src/cfg/DBconfig.js";
import routes from "./src/routes/PostsRoutes.js";


const app = express();
routes(app)

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
