const express = require('express');
const bodyParser = require('body-parser');
const { writeFile, readFile, generateToken } = require('./utils');
const { users } = require('./login');
const { validatelogin } = require('./middleware/validateLogin');
const { validateTalker } = require('./middleware/validateTalker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const talker = await readFile();

  return res.status(200).json(talker);
});

app.get('/talker/:id', async (req, res) => {
  const talker = await readFile();
  const { id } = req.params;
  
  const result = talker.find((t) => t.id === +id);

  if (!result) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(result);
});

app.post('/login', validatelogin, (req, res) => {
  const { email, password } = req.body;

  users.push({ email, password });

  return res.status(200).json({ token: generateToken() });
});

// app.post('/talker', validateTalker, async (req, res) => {
//   const talker = await readFile();

//   const { name, age, talk } = req.body;

//   talker.push({ id: Math.max(...talker.map((t) => t.id)) + 1, name, age, talk });

//   await writeFile(talker);

//   return res.status(201).json({ id: Math.max(...talker.map((t) => t.id)) + 1, name, age, talk });
// });

// get com sarch pesquisa
// app.get('/talker/search?q=searchTerm', async (req, res) => {
//   const talker = await readFile();
//   const { name } = req.params;

//   const result = talker.find((elem) => elem.name === name);

//   if (!result) {
//     return res.status();
//   }
// });

app.listen(PORT, () => {
  console.log(`Online ${PORT}`);
});
