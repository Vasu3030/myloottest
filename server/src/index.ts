import express from 'express'
import cors from 'cors'
import teamRoutes from './routes/teamRoutes'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/teams', teamRoutes)

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
