import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { studentRouter } from './routes/studentRouter.js';
import { logger } from './config/logger.js';
import { db } from './models/index.js';

(async () => {
  try {
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info('Conectado com sucesso ao banco de dados');
  } catch (err) {
    logger.error(`Erro ao conectar no banco de dados! ${err}`);

    process.exit();
  }
})();

const app = express();

//Body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Cors conectando com o Frontend
app.use(cors({ origin: 'https://grade-app-frontend.herokuapp.com' }));

//Rotas
app.use(studentRouter);

app.get('/', (_, res) => {
  res.send(`Api em execução`);
});

app.listen(db.port, () => {
  logger.info(`Servidor em execução na porta ${db.port}!`);
});
