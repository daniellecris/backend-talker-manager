// const { validateResults } = require('express-validator');

// const validateTalker = (req, res, next) => {
//   const errors = validateResults(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }
  
//   next();
// };

// const validateToken = (req, res) => {
//   const { authorization } = req.headers;
//   if (!authorization) {
//     return res.status(401).json({ message: 'Token não encontrado' });
//   }

//   if (authorization.length !== 16) {
//     return res.status(401).json({ message: 'Token inválido' });
//   }

//   // next();
// };

// const validateName = (req, res) => {
//   const { name } = req.body;

//   if (!name || name === '') {
//     return res.status(400).json({ message: 'O campo "name" é obrigatório' });
//   }

//   if (name.lenght < 3) {
//     return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
//   }

//   // next();
// };

// const validateAge = (req, res) => {
//   const { age } = req.body;

//   if (!age) {
//     return res.status(400).json({ message: 'O campo "age" é obrigatório' });
//   }

//   if (age < '18') {
//     return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
//   }

//   // next();
// };

// // const validatTalk = (req, res, next) => {
// //     const { talk } = req.body;
  
// //     if (talk.watchedAt !== 'dd/mm/aaaa') {
// //       return res.status(400).json({ 
// //           message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
// //     }
  
// //     if (age < '18') {
// //       return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
// //     }
  
// //     next();
// //   };

// module.exports = {
//   validateTalker,
//   validateToken,
//   validateName,
//   validateAge,
//   // validateTalk,
// };
