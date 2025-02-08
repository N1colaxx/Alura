import dotenv from 'dotenv';
import  mysql  from 'mysql2/promise';


dotenv.config(); //Isso vai carregar as variáveis do arquivo .env
// logs para monitorar 
// console.log('DB_HOST:', process.env.DB_HOST);
// console.log('DB_USER:', process.env.DB_USER);
// console.log('DB_PORT:', process.env.DB_PORT);
// console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
// console.log('DB_NAME:', process.env.DB_NAME);


export default async function conectarAoBanco() {

  const {DB_HOST, DB_USER, DB_PORT, DB_PASSWORD, DB_NAME} = process.env; 

  if (!DB_HOST || !DB_USER || !DB_NAME) {
    // logs para monitorar 
    //console.log(process.env.DB_HOST, process.env.DB_USER,process.env.DB_PORT, process.env.DB_PASSWORD, process.env.DB_NAME);
    console.error('Variaveis de conexão indefinidas!!');
    process.exit(1); // Encerra o programa caso as variáveis não estejam definidas
  }

  try {
    console.log('Conectando ao MySQL...');
    const conexao = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      port: DB_PORT,
      password: DB_PASSWORD,
      database: DB_NAME,
    });

    console.log('Conectado ao MySQL com sucesso!!');
    return conexao;
  } catch (erro) {
      console.error('Falha ao conectar ao banco!', erro);
      process.exit(1);
    }
};
