const app = require('./app');
require('dotenv').config();

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto
// Iniciando Projeto

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
