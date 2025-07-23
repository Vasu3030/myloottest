import express from 'express'
import cors from 'cors'
import teamRoutes from './routes/teamRoutes'
import coinEarningRoutes from './routes/coinEarningRoutes'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/teams', teamRoutes)
app.use('/coins', coinEarningRoutes)

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
