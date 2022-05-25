const express = require('express');
const bodyParser = require('body-parser');
const { writeFile, readFile, generateToken } = require('./utils');
const { users } = require('./login');
const { validatelogin } = require('./middleware/validateLogin');
const { validateToken, validateName,
        validateAge, validateTalk, 
        validateWatchedAt } = require('./middleware/validateTalker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// get com sarch pesquisa - req 8
app.get('/talker/search', validateToken, async (req, res) => {
  const talker = await readFile();
  const { q } = req.query;

  const result = talker.filter((elem) => elem.name.includes(q));

  return res.status(200).json(result);
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

// req 5
app.post('/talker', validateToken, validateName, 
          validateAge, validateTalk,
          validateWatchedAt, async (req, res) => {
  const talker = await readFile();

  const { name, age, talk: { watchedAt, rate } } = req.body;

  const newTalker = {
     id: Math.max(...talker.map((t) => t.id)) + 1, name, age, talk: { watchedAt, rate },
    };

  talker.push(newTalker);

  await writeFile(talker);

  return res.status(201).json(newTalker);
});

// delete talker/id - req 7
app.delete('/talker/:id', validateToken, async (req, res) => {
  const talker = await readFile();
  const { id } = req.params;

  const result = talker.filter((t) => t.id !== +id);

  await writeFile(result);

  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Online ${PORT}`);
});
