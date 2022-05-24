const fs = require('fs/promises');
const crypto = require('crypto');

const readFile = async () => {
  const data = await fs.readFile('talker.json', 'utf-8');
  return JSON.parse(data);
};

const writeFile = async (data) => {
  const stringifyData = JSON.stringify(data, null, 2);
  await fs.writeFile('talker.json', stringifyData, 'utf-8');
};

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

module.exports = {
  readFile,
  writeFile,
  generateToken,
};