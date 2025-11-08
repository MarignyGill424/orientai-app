import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import orientationRoute from './routes/orientation.route.js'

dotenv.config()

const app = express()
const PORT = 5000;


app.use(cors())
app.use(express.json())

app.use("/api", orientationRoute)
app.get("/ping", (_, res) => res.send("pong"))
app.get("/", (_req, res) => {
  res.send("Bienvenue sur le serveur OrientAI 🚀");
});

app.listen(PORT, () => {
  console.log(`✅ Serveur OrientAI lancé sur http://localhost:${PORT}`)
})

