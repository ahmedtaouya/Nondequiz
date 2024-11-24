const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors()); 

const users = [
  { email: 'Joueur1@example.com', password: 'Joueur1' },
  { email: 'Joueur2@example.com', password: 'Joueur2' },
  { email: 'Joueur3@example.com', password: 'Joueur3' }
];

const activeSessions = {};

function generateToken() {
  return crypto.randomBytes(16).toString('hex');
}


app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find((user) => user.email === email && user.password === password);

  if (user) {
    const token = generateToken();  
    activeSessions[token] = email; 

    res.status(200).json({ message: 'Connexion réussie', success: true, token });
  } else {
    res.status(401).json({ message: 'Email ou mot de passe incorrect', success: false });
  }
});

function authenticate(req, res, next) {
  const token = req.headers['authorization'];
  if (token && activeSessions[token]) {
    req.userEmail = activeSessions[token];
    next();
  } else {
    res.status(403).json({ message: 'Non autorisé', success: false });
  }
}

app.get('/multiplayer', authenticate, (req, res) => {
  res.status(200).json({ message: `Bienvenue, ${req.userEmail}! Vous êtes connecté en mode multijoueur.` });
});

app.post('/logout', authenticate, (req, res) => {
  const token = req.headers['authorization'];
  delete activeSessions[token];
  res.status(200).json({ message: 'Déconnexion réussie', success: true });
});

app.listen(PORT, () => {
  console.log(`Serveur en cours d’exécution sur http://localhost:${PORT}`);
});
