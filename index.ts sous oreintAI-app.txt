import express from 'express';
import router from './routes'; // si tu as créé routes.ts

const app = express();
const port = 3001;

app.use(express.json());
app.use('/api', router); // si routes.ts existe

app.get('/', (req, res) => {
  res.send('Hello Gill, ton serveur fonctionne !');
});

app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});
