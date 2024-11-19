import express from "express";
//          express -> é uma função
const app = express();
app.listen(3000, () => {
    console.log("Servidor escutando... ");
});

//              req -> rquisição / res-> resposta 
app.get("/api", (req, res) => {
    res.status(200).send("Boas VA Torre Eiffel iluminada à noite, com milhares de luzes cintilando, criando um espetáculo mágico em Paris.indas a imerção!");
});