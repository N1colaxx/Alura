import { MongoClient } from 'mongodb'; // Cliente fornecido pela biblioteca mongodb para conectar e interagir com bancos de dados MongoDB.
import dotenv from 'dotenv';

dotenv.config(); //Isso vai carregar as variáveis do arquivo .env

export default async function conectarAoBanco() {
  const stringConnection = process.env.STRING_CONNECTION;
  if (!stringConnection) {
    console.error('String de conexão não definida!');
    process.exit(1);   // Encerra o programa caso a string de conexão não esteja definida
  }

  let mongoClient;

  try {
      mongoClient = new MongoClient(stringConnection);
      console.log('Conectando ao cluster do banco de dados...');
      await mongoClient.connect();
      console.log('Conectado ao MongoDB Atlas com sucesso!');

      return mongoClient;
  } catch (erro) {
      console.error('Falha na conexão com o banco!', erro);
      process.exit();
  }
}


