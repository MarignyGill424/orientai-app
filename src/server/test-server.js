const express = require('express');
const app = express();

app.get('/ping', (req, res) => {
  console.log("📡 Requête ping reçue !");
  res.send('pong');
});

app.listen(3000, '0.0.0.0', () => {
  console.log("✅ Serveur Express lancé sur http://localhost:3000");
});
