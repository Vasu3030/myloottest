import express from 'express'
import { postCoinsToTeam } from '../controllers/coinEarningController'

const router = express.Router()

// Add coins to user and his team
router.post('/', postCoinsToTeam)

export default router
