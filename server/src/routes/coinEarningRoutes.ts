import express from 'express'
import { postCoinsToTeam } from '../controllers/coinEarningController'

const router = express.Router()

router.post('/', postCoinsToTeam)

export default router
