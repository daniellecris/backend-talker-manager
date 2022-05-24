const fs = require('fs/promises');

const readFile = async () => {
  const data = await fs.readFile('talker.json', 'utf-8');
  return JSON.parse(data);
};

const writeFile = async (data) => {
  const stringifyData = JSON.stringify(data, null, 2);
  await fs.writeFile('talker.json', stringifyData, 'utf-8');
};

module.exports = {
  readFile,
  writeFile,
};