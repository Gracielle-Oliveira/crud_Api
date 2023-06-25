const express = require('express');
const app = express();
app.use(express.json());

let users = [
  { id: 1, name: 'Cliente 1' },
  { id: 2, name: 'Cliente 2' },
  { id: 3, name: 'Cliente 3' }
];


// Rota GET para retornar todos os usuários
app.get('/users', (req, res) => {
  res.json(users);
});

// Rota GET para retornar um usuário específico
app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(user => user.id === id);
  
  if (!user) {
    return res.status(404).json({ error: 'Cliente não encontrado' });
  }
  
  res.json(user);
});

// Rota POST para adicionar um novo Cliente
app.post('/users', (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).json(newUser);
});


// Rota PUT para atualizar um Cliente existente
app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedUser = req.body;
  let userIndex = users.findIndex(user => user.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'Cliente não encontrado' });
  }
  
  users[userIndex] = { id, ...updatedUser };
  
  res.json(users[userIndex]);
});

// Rota DELETE para remover um Cliente
app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex(user => user.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'Cliente não encontrado' });
  }
  
  const deletedUser = users.splice(userIndex, 1)[0];
  
  res.json(deletedUser);
});



// Iniciar o servidor
app.listen(3000, () => {
  console.log('API rodando em http://localhost:3000');
});
