import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import teamRoutes from './routes/teamRoutes'
import coinEarningRoutes from './routes/coinEarningRoutes'
import userRoutes from './routes/userRoutes'

// Charger les variables d'environnement
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/users', userRoutes)
app.use('/teams', teamRoutes)
app.use('/coins', coinEarningRoutes)

// Utiliser la variable PORT ou par défaut 3000
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
