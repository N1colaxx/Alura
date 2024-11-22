import express from "express";
import multer from "multer";
import cors from "cors";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

import {  listAllPosts, publishNewPost, uploadImagem, updateNewPost}  from "../controllers/PostsController.js";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: "./uploads" , storage})

const routes = (app) => {
    app.use(express.json());
    app.use(cors(corsOptions))

    app.get("/posts", listAllPosts); // pega todos os post
    // app.get("/buscaID", buscaPostPorID) // pega pelo Id 
    // app.get("/posts/query", buscaTapyQuery)

    app.post("/posts", publishNewPost) // criar um novo post
    app.post("/upload", upload.single("imagem"), uploadImagem);
    // app.post("/coment", uploadComentario);

    app.put("/upload/:id", updateNewPost)
    
}

export default routes;

 



