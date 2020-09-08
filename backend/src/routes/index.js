const express = require('express');
const User = require('../models/index');
const router = express.Router();

// Rota para selecionar todos os usuários cadastrados
router.get('/', async (request, response) => {
  await User.find({}, (err, data) => {
    response.json(data);
  })
});

// Rota para selecionar um usuário específico pelo id
router.get('/:id', async (request, response) => {

  await User.findById(request.params.id, (err, data) => {
    if (err) {
      response.status(404).json({"error": "This ID does not exist"});
    }
    response.json(data);
  });
});

// Rota para deletar todos os usuários cadastrados
router.delete('/', async (request, response) => {
  await User.deleteMany({}, (err, data) => {
    response.json({"message": "all users have been deleted"});
  });
});
  
// Rota para deletar um usuário pelo id
router.delete('/:id', async (request, response) => {
  await User.findByIdAndDelete(request.params.id, (err, data) => {
    if (err) {
      response.status(404).json({"error": "This ID does not exist"});
    } 
    response.status(200).json({"message": "deleted"});
  });
});

// Rota para inserir um novo id
router.post('/', async (request, response) => {
  const { name, email, password } = request.body;
  const emailExists = await User.find({ email: email }).exec();

  user = new User({
    name,
    email,
    password,
  });

  if ( !name || !email || !password ) {
    return response.status(404).json({"error": "All the fields must be given"});
  }

  if (emailExists.length > 0) {
    return response.status(409).json({"error": "this e-mail adress is already registered."});
  } else {
    await user.save(() => {
      return response.status(200).json(user);
    });
  }
});

// Rota para alterar um usuário cadastrado
router.put('/:id', async (request, response) => {
  const { name, email, password } = request.body;
  await User.findByIdAndUpdate(request.params.id, request.body);

  user = { 
    name,
    email,
    password,
  };

  return response.json(user);
});

module.exports = router;