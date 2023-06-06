const express = require('express');
const db = require('./db/db');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/verstuur-emails', (req, res) => {
    const query = 'SELECT email FROM gebruikers WHERE ingelogd = true';
  
    db.query(query, (err, result) => {
      if (err) {
        console.error('Fout bij het ophalen van de gebruikers: ' + err.stack);
        res.status(500).send('Er is een fout opgetreden');
        return;
      }
  
      const gebruikers = result.map((row) => row.email);
  
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'jouw_email@gmail.com',
          pass: 'jouw_email_wachtwoord'
        }
      });
  
      const mailOptions = {
        from: 'jouw_email@gmail.com',
        subject: 'Welkom op onze website',
        text: 'Welkom op onze website! Klik op onderstaande link om naar de homepagina te gaan:',
        html: '<p>Welkom op onze website! Klik op onderstaande link om naar de homepagina te gaan:</p><a href="http://jouw_website/home">Homepagina</a>'
      };
  
      gebruikers.forEach((gebruiker) => {
        mailOptions.to = gebruiker;
  
        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            console.error('Fout bij het versturen van de e-mail naar ' + gebruiker + ': ' + err.stack);
          } else {
            console.log('E-mail verstuurd naar ' + gebruiker + ': ' + info.response);
          }
        });
      });
  
      res.status(200).send('E-mails worden verstuurd');
    });
  });
  
  module.exports = router;