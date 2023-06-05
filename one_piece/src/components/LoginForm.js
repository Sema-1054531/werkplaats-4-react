const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const app = express();

// Gebruik express-session-middleware
app.use(
  session({
    secret: 'geheimeSleutel',
    resave: false,
    saveUninitialized: false,
  })
);

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Zoek de gebruiker in de database op basis van het e-mailadres
  const user = await db.getUserByEmail(email);

  // Controleer of de gebruiker bestaat en het wachtwoord overeenkomt
  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ message: 'Ongeldige inloggegevens' });
  }

  // Sla de gebruikersgegevens op in de sessie
  req.session.user = {
    id: user.id,
    email: user.email,
  };

  res.json({ message: 'Inloggen succesvol' });
});

// login controle
const express = require('express');
const router = express.Router();

const requireLogin = (req, res, next) => {
  // Controleer of de gebruiker is ingelogd
  if (!req.session.user) {
    return res.status(401).json({ message: 'Niet ingelogd' });
  }

  next();
};

router.get('/protected', requireLogin, (req, res) => {
  res.json({ message: 'Dit is een beschermde route' });
});

module.exports = router;

