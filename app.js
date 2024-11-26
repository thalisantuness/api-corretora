const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./src/utils/db');
const routes = require('./src/routes/routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: true, limit: '900mb' }));
app.use(bodyParser.json({ limit: '900mb' }));

app.use(cors());
app.use('/', routes);

sequelize.sync()
  .then(() => {
    console.log('Modelos sincronizados com o banco de dados');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar modelos com o banco de dados:', error);
  });

const PORT = 4000;

app.listen(PORT, function() {
  console.log('Servidor web iniciado na porta:', PORT);
});
